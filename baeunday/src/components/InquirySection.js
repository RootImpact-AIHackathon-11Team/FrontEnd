import { useState, useEffect } from 'react';
import profileEx1 from '../assets/examples/profileEx1.png';
import profileDft from '../assets/examples/profileDft1.png';
import InquiryActionSheet from './InquiryActionSheet';
import '../css/inquiryActionSheet.css';
import '../css/inquirySection.css';
import InquiryModal from './InquiryModal';

const InquirySection = ({ lectureData, currentUser }) => {
  const [newQuestion, setNewQuestion] = useState('');
  const [inquiries, setInquiries] = useState(lectureData.inquiries);
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [isOwnComment, setIsOwnComment] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsOwner(currentUser === lectureData.instructor);
  }, [currentUser, lectureData.instructor]);

  const handleInputChange = (e) => setNewQuestion(e.target.value);

  const getUserProfileImage = (username) => {
    switch(username) {
      case '조림핑':
        return profileEx1;
      case '컴공 사이에 피어난 전쟁통':
        return profileEx1;
      default:
        return profileDft;
    }
  };

  const handleSubmit = () => {
    if (newQuestion.trim()) {
      const newInquiry = {
        id: inquiries.length + 1,
        user: currentUser,
        date: new Date().toISOString().slice(0, 10),
        question: newQuestion,
        profileImg: getUserProfileImage(currentUser),
        answer: null,
      };
      setInquiries([...inquiries, newInquiry]);
      setNewQuestion('');
    }
  };

  const handleAnswerSubmit = (inquiryId) => {
    const answerContent = prompt('답변을 입력하세요:');
    if (answerContent) {
      const updatedInquiries = inquiries.map((inquiry) =>
        inquiry.id === inquiryId
          ? { ...inquiry, answer: { date: new Date().toISOString().slice(0, 10), content: answerContent } }
          : inquiry
      );
      setInquiries(updatedInquiries);
    }
  };

  const handleMoreClick = (inquiry, isAnswer = false) => {
    setSelectedInquiry(inquiry);
    setIsAnswerSelected(isAnswer);
    
    if (isOwner) {
      if (isAnswer) {
        setIsOwnComment(true);
      } else {
        setIsOwnComment(false);
      }
    } else {
      setIsOwnComment(inquiry.user === currentUser);
    }
    
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

  const handleInquirySubmit = (content) => {
    // 여기에 문의 등록 로직 추가
    console.log('문의 등록:', content);
    // API 호출 등의 로직이 들어갈 수 있습니다
  };

  return (
    <div className="inquiry-section">
      {!isOwner && ( <div className="inquiry-section-header">
        <h3>문의하기</h3>
        <button
        className="direct-inquiry-btn"
        onClick={() => setIsModalOpen(true)}>
          문의 등록
        </button>
      </div>
      )}
      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleInquirySubmit}
      />
      {inquiries.map((inquiry) => (
        <div key={inquiry.id} className="comment-item">
          <div className="comment-header">
            <div className="comment-profile">
              <img 
                src={inquiry.profileImg || profileDft} 
                alt={inquiry.user} 
                className="comment-profile-image"
              />
              <span className="comment-username">{inquiry.user}</span>
              <span className="comment-date">{inquiry.date}</span>
            </div>
            {(isOwner || (!isOwner && currentUser === inquiry.user)) && (
              <button 
                className="more-button" 
                onClick={() => handleMoreClick(inquiry)}
              >⋮</button>
            )}
          </div>
          <p className="comment-text">{inquiry.question}</p>
          
          {inquiry.answer && (
            <div className="comment-reply">
              <div className="comment-header">
                <span className="comment-username">강사님</span>
                <span className="comment-date">{inquiry.answer.date}</span>
                {isOwner && (
                  <button 
                    className="more-button"
                    onClick={() => handleMoreClick(inquiry, true)}
                  >⋮</button>
                )}
              </div>
              <p className="comment-text">{inquiry.answer.content}</p>
            </div>
          )}
        </div>
      ))}

      

      <InquiryActionSheet
        isVisible={actionSheetVisible}
        onClose={() => setActionSheetVisible(false)}
        isOwnComment={isOwnComment}
        isOwner={isOwner}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onReply={handleReply}
      />
    </div>
  );
};

export default InquirySection;