import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import profileEx1 from '../assets/examples/profileEx1.png';
import profileDft from '../assets/examples/profileDft1.png';
import InquiryActionSheet from './InquiryActionSheet';
import '../css/inquiryActionSheet.css';
import '../css/inquirySection.css';
import InquiryModal from './InquiryModal';

const API_BASE_URL = 'https://mannajang.store/api';

const InquirySection = ({ lectureId, isOwner }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState('');
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [nextCursor, setNextCursor] = useState(null);
  const [nextId, setNextId] = useState(null);
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);

  const fetchInquiries = async () => {
    try {
      console.log('🔍 lectureId:', lectureId);
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const config = {
        headers: {
          'Authorization': token.startsWith('Bearer ') ? token : `Bearer ${token}`,
          'Accept': '*/*'
        }
      };

      // Request 로깅
      console.log('📤 Request Info =========');
      console.log('URL:', `${API_BASE_URL}/comments/${lectureId}`);
      console.log('Method: GET');
      console.log('Headers:', config.headers);
      console.log('Query Params:', nextCursor ? { cursor: nextCursor, id: nextId } : 'none');

      const url = nextCursor 
        ? `${API_BASE_URL}/comments/${lectureId}?cursor=${nextCursor}&id=${nextId}`
        : `${API_BASE_URL}/comments/${lectureId}`;

      const response = await axios.get(url, config);
      
      // Response 로깅
      console.log('📥 Response Info =========');
      console.log('Status:', response.status);
      console.log('Status Text:', response.statusText);
      console.log('Headers:', response.headers);
      console.log('Data:', response.data);

      if (response.data?.data) {
        console.log('✅ Response Details =========');
        console.log('Cursor Info:', response.data.data.cursor);
        console.log('Comments:', response.data.data.body);
        console.log('Has Next Page:', response.data.data.cursor?.hasNext);
        console.log('Next Cursor:', response.data.data.cursor?.nextCursor);
      }

      if (response.status === 200) {
        const { cursor, body } = response.data.data;
        
        setInquiries(prev => 
          nextCursor ? [...prev, ...body] : body
        );

        if (cursor) {
          setHasMore(cursor.hasNext);
          setNextCursor(cursor.nextCursor);
          setNextId(cursor.nextId);
        } else {
          setHasMore(false);
          setNextCursor(null);
          setNextId(null);
        }
      }
    } catch (error) {
      console.error('❌ Error Info =========');
      console.error('Error Message:', error.message);
      console.error('Error Response:', error.response?.data);
      console.error('Error Status:', error.response?.status);
      console.error('Error Headers:', error.response?.headers);
      console.error('Full Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('🔄 lectureId 변경됨:', lectureId);
    if (lectureId) {
      fetchInquiries();
    }
  }, [lectureId]);

  useEffect(() => {
    const username = localStorage.getItem('username');
    setCurrentUser(username || '');
  }, []);

  const handleInquirySubmit = async (content) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': token.startsWith('Bearer ') ? token : `Bearer ${token}`,
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      };

      const response = await axios.post(
        `${API_BASE_URL}/comments/${lectureId}`,
        { field: content },
        config
      );

      if (response.status === 200) {
        setIsModalOpen(false);
        fetchInquiries(); // 목록 새로고침
      }
    } catch (error) {
      console.error('문의 등록 실패:', error);
      alert('문의 등록에 실패했습니다.');
    }
  };

  const handleAnswerSubmit = async (commentId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': token.startsWith('Bearer ') ? token : `Bearer ${token}`,
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      };

      const response = await axios.post(
        `${API_BASE_URL}/comments/${lectureId}/reply/${commentId}`,
        { field: prompt('답변을 입력하세요:') },
        config
      );

      if (response.status === 200) {
        fetchInquiries(); // 목록 새로고침
      }
    } catch (error) {
      console.error('답변 등록 실패:', error);
      alert('답변 등록에 실패했습니다.');
    }
    setActionSheetVisible(false);
  };

  const handleMoreClick = (inquiry, isAnswer = false) => {
    setSelectedInquiry(inquiry);
    setIsAnswerSelected(isAnswer);
    
    setActionSheetVisible(true);
  };

  const handleEdit = () => {
    const editContent = isAnswerSelected ? selectedInquiry.answer.content : selectedInquiry.question;
    const newContent = prompt('수정할 내용을 입력하세요:', editContent);
    
    if (newContent) {
      const updatedInquiries = inquiries.map((inquiry) => {
        if (inquiry.id === selectedInquiry.id) {
          if (isOwner && isAnswerSelected) {
            // 강사가 자신의 답변을 수정하는 경우
            return {
              ...inquiry,
              answer: {
                ...inquiry.answer,
                content: newContent
              }
            };
          } else if (!isOwner && inquiry.user === currentUser) {
            // 일반 사용자가 자신의 질문을 수정하는 경우
            return {
              ...inquiry,
              question: newContent
            };
          }
        }
        return inquiry;
      });
      
      setInquiries(updatedInquiries);
      setActionSheetVisible(false);
    }
  };

  const handleDelete = () => {
    // 삭제 권한 체크
    const canDelete = isOwner ? 
      // 강사인 경우 자신의 답변만 삭제 가능
      isAnswerSelected : 
      // 일반 사용자인 경우 자신의 댓글만 삭제 가능
      selectedInquiry.user === currentUser;

    if (!canDelete) {
      alert('삭제 권한이 없습니다.');
      setActionSheetVisible(false);
      return;
    }

    if (window.confirm('정말 삭제하시겠습니까?')) {
      const updatedInquiries = inquiries.map((inquiry) => {
        if (inquiry.id === selectedInquiry.id) {
          if (isOwner && isAnswerSelected) {
            // 강사가 자신의 답변을 삭제하는 경우
            return { ...inquiry, answer: null };
          } else if (!isOwner && inquiry.user === currentUser) {
            // 일반 사용자가 자신의 질문을 삭제하는 경우
            return null;
          }
        }
        return inquiry;
      }).filter(Boolean); // null 값 제거
      
      setInquiries(updatedInquiries);
      setActionSheetVisible(false);
    }
  };

  const handleReply = () => {
    handleAnswerSubmit(selectedInquiry.id);
    setActionSheetVisible(false);
  };

  return (
    <div className="inquiry-section">
      {!isOwner && (
        <div className="inquiry-section-header">
          <h3>문의하기</h3>
          <button
            className="direct-inquiry-btn"
            onClick={() => setIsModalOpen(true)}
          >
            문의 등록
          </button>
        </div>
      )}

      {inquiries.map((inquiry) => (
        <div key={inquiry.comment_id} className="comment-item">
          <div className="comment-header">
            <div className="comment-profile">
              <img 
                src={inquiry.profileImg} 
                alt={inquiry.name} 
                className="comment-profile-image"
              />
              <span className="comment-username">{inquiry.name}</span>
              <span className="comment-date">
                {new Date(inquiry.createdDate).toLocaleDateString()}
              </span>
            </div>
            <button 
              className="more-button" 
              onClick={() => handleMoreClick(inquiry)}
            >⋮</button>
          </div>
          <p className="comment-text">{inquiry.field}</p>
          
          {inquiry.replies?.map(reply => (
            <div key={reply.reply_id} className="comment-reply">
              <div className="comment-header">
                <span className="comment-username">{reply.name}</span>
                <span className="comment-date">
                  {new Date(reply.createdDate).toLocaleDateString()}
                </span>
                {isOwner && (
                  <button 
                    className="more-button"
                    onClick={() => handleMoreClick(inquiry, true)}
                  >⋮</button>
                )}
              </div>
              <p className="comment-text">{reply.field}</p>
            </div>
          ))}
        </div>
      ))}

      {loading && <div className="loading">로딩 중...</div>}
      
      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleInquirySubmit}
      />

      <InquiryActionSheet
        isVisible={actionSheetVisible}
        onClose={() => setActionSheetVisible(false)}
        isOwnComment={selectedInquiry?.name === currentUser}
        isOwner={isOwner}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onReply={handleReply}
      />
    </div>
  );
};

export default InquirySection;