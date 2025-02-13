import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/lectureDetail.css';
import LectureHeader from './LectureHeader';
import InquirySection from './InquirySection'; 
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

import mainEx1 from '../assets/examples/mainEx1.png';
import mainEx2 from '../assets/examples/mainEx2.png';
import mainEx3 from '../assets/examples/mainEx3.png';
import mainEx4 from '../assets/examples/mainEx4.png';
import mainEx5 from '../assets/examples/mainEx5.png';
import profileEx1 from '../assets/examples/profileEx1.png';
import profileDft from '../assets/examples/profileDft1.png';
import jjimIcon from '../assets/images/jjim.svg';
import jjimedIcon from '../assets/images/jjimed.svg';


const getTemperaturePercentage = (temp) => {
  const tempNumber = parseFloat(temp.replace('℃', ''));
  const minTemp = 0;
  const maxTemp = 100; // 기준 최대 온도
  const percentage = ((tempNumber - minTemp) / (maxTemp - minTemp)) * 100;

  return Math.min(100, Math.max(0, percentage)); // 0% ~ 100% 사이로 제한
};

// manner 점수를 온도로 변환하는 함수 추가
const calculateTemperature = (manner) => {
  // manner는 0~10000 사이의 값이며, 10000이 만점
  // 36.5도를 기준으로 ±3.5도 범위 내에서 변환 (33도 ~ 40도)
  const baseTemp = 36.5;
  const range = 3.5;
  const normalizedManner = manner / 10000; // 0~1 사이 값으로 정규화
  const temperature = baseTemp + (normalizedManner - 0.5) * (range * 2);
  return temperature.toFixed(1);
};

// 매너 점수 비율 계산 함수
const getMannerPercentage = (manner) => {
  const maxManner = 10000; // 만점 10000보
  return (manner / maxManner) * 100; // 백분율로 변환
};

const LectureDetailPage = () => {
  const API_BASE_URL = 'https://mannajang.store/api';
  const { lectureId } = useParams();
  const [lectureData, setLectureData] = useState(null);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState('조림핑');
  const [isOwner, setIsOwner] = useState(false);
  const [isHearted, setIsHearted] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const navigate = useNavigate();

  const toggleHeart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('❌ 토큰이 없습니다.');
        navigate('/login');
        return;
      }

      const config = {
        headers: {
          'Authorization': token.startsWith('Bearer ') ? token : `Bearer ${token}`,
          'Accept': '*/*',
          'Content-Type': 'application/json'
        },
        withCredentials: true
      };

      const requestBody = {
        postId: lectureId.toString(),
        createdDate: new Date().toISOString()
      };

      // 상태를 먼저 업데이트하여 UI 반응성 향상
      setLectureData(prevData => ({
        ...prevData,
        isHearted: !prevData.isHearted,
        likeCount: prevData.isHearted ? prevData.likeCount - 1 : prevData.likeCount + 1
      }));

      const response = await axios.post(
        `${API_BASE_URL}/hearts`,
        requestBody,
        config
      );

      if (response.status !== 200) {
        // API 호출이 실패하면 상태를 원래대로 되돌림
        setLectureData(prevData => ({
          ...prevData,
          isHearted: !prevData.isHearted,
          likeCount: prevData.isHearted ? prevData.likeCount - 1 : prevData.likeCount + 1
        }));
      }
    } catch (error) {
      // API 호출이 실패하면 상태를 원래대로 되돌림
      setLectureData(prevData => ({
        ...prevData,
        isHearted: !prevData.isHearted,
        likeCount: prevData.isHearted ? prevData.likeCount - 1 : prevData.likeCount + 1
      }));

      console.error('❌ Heart Error:', error);
      if (error.response?.status === 403) {
        console.log('🔒 토큰이 만료되었거나 유효하지 않습니다.');
        localStorage.removeItem('token');
        navigate('/login', { 
          state: { 
            message: '로그인이 필요합니다. 다시 로그인해주세요.',
            returnPath: `/lecture/${lectureId}`
          } 
        });
      }
    }
  };

  const handleReservation = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('❌ 토큰이 없습니다.');
        navigate('/login');
        return;
      }

      const config = {
        headers: {
          'Authorization': token.startsWith('Bearer ') ? token : `Bearer ${token}`,
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      };

      const requestBody = {
        postId: lectureId,
        reservationDate: new Date().toISOString()
      };

      // 현재 상태 로깅
      console.log('신청/취소 요청 전 상태:', lectureData.isReserved);

      // 신청/취소 요청
      const response = await axios.post(
        `${API_BASE_URL}/reserve`,
        requestBody,
        config
      );

      if (response.status === 200) {
        console.log('✅ 강의 신청/취소 요청 성공');
        
        // 강의 정보 다시 불러오기
        const updatedData = await axios.get(`${API_BASE_URL}/posts/${lectureId}`, config);
        const newIsReserved = updatedData.data.data.body.isReserved;
        console.log('업데이트된 신청 상태:', newIsReserved);

        // 상태 업데이트
        setLectureData(prevData => ({
          ...prevData,
          isReserved: newIsReserved,
          participants: updatedData.data.data.body.participants
        }));

        // 결과 알림
        alert(newIsReserved ? '강의가 신청되었습니다!' : '신청이 취소되었습니다.');
        
        if (newIsReserved) {
          // 신청 성공 시 신청 목록 페이지로 이동
          navigate('/applied');
        } else {
          // 취소 시 페이지 새로고침
          window.location.reload();
        }
      }
    } catch (error) {
      console.error('❌ Reservation Error:', error);
      if (error.response?.status === 403) {
        console.log('🔒 토큰이 만료되었거나 유효하지 않습니다.');
        localStorage.removeItem('token');
        navigate('/login', { 
          state: { 
            message: '로그인이 필요합니다. 다시 로그인해주세요.',
            returnPath: `/lecture/${lectureId}`
          } 
        });
      } else {
        alert(lectureData.isReserved ? '신청 취소에 실패했습니다.' : '강의 신청에 실패했습니다.');
      }
    }
  };

  useEffect(() => {
    const fetchLectureDetail = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('로그인이 필요합니다.');
          navigate('/login');
          return;
        }

        const config = {
          headers: {
            'Authorization': token.startsWith('Bearer ') ? token : `Bearer ${token}`,
            'Accept': '*/*'
          }
        };

        const response = await axios.get(`${API_BASE_URL}/posts/${lectureId}`, config);
        console.log('✅ Lecture Detail Response:', response.data);

        if (response.data?.data?.body) {
          const lectureDetail = response.data.data.body;
          console.log('서버에서 받은 isReserved:', lectureDetail.isReserved);  // 로그 추가

          setLectureData({
            title: lectureDetail.title,
            image: lectureDetail.imgURL,
            date: lectureDetail.startDate,
            applicationPeriod: `${new Date(lectureDetail.startDate).toLocaleDateString()} ~ ${new Date(lectureDetail.endDate).toLocaleDateString()}`,
            fee: lectureDetail.fee === 0 ? '무료' : `${lectureDetail.fee.toLocaleString()}원`,
            location: `${lectureDetail.province} ${lectureDetail.city} ${lectureDetail.address}`,
            instructor: lectureDetail.user.name,
            instructorTemperature: `${lectureDetail.user.manner}보`,
            participants: lectureDetail.participants,  // currentApplicants 대신 participants 사용
            maximumPeople: lectureDetail.maximumPeople,  // maxApplicants 대신 maximumPeople 사용
            minimumPeople: lectureDetail.minimumPeople,
            likeCount: lectureDetail.hearts,
            profileImg: lectureDetail.user.profileImgURL,
            isMyPost: lectureDetail.isMyPost,
            isHearted: lectureDetail.isHearted,
            isReserved: lectureDetail.isReserved,  // isReserved 추가
            status: lectureDetail.status,
            manner: lectureDetail.user.manner
          });
          
          console.log('설정된 lectureData:', lectureData);  // 로그 추가
          setIsOwner(lectureDetail.isMyPost);
          setIsHearted(lectureDetail.isHearted);
          setIsApplied(lectureDetail.isApplied); // 신청 상태 초기화
          console.log('Initial isHearted status:', lectureDetail.isHearted);
          console.log('Initial isApplied status:', lectureDetail.isApplied);
        }
      } catch (error) {
        console.error('❌ Error:', error);
      }
    };

    fetchLectureDetail();
  }, [lectureId, navigate]);

  const calculateProgress = (current, total) => {
    return (current / total) * 100;
  };

  // 사용자 전환 핸들러
  const handleUserChange = (e) => {
    setCurrentUser(e.target.value);
  };

  const handleInquiryClick = () => {
    navigate(`/lecture/${lectureId}/inquiries`, {
      state: {
        lectureData: lectureData,
        currentUser: currentUser
      }
    });
  };

  if (error) return <div>Error: {error}</div>;
  if (!lectureData) return <div>Loading...</div>;

  return (
    <div className="lecture-detail-wrapper">
      <div className="lecture-detail-container">
        <LectureHeader 
          isInstructor={isOwner} 
          isHearted={lectureData?.isHearted}
          onHeartClick={toggleHeart}
          lectureId={lectureId}
        />
        
        {/* 모드 선택 드롭다운 */}
        <select 
          onChange={handleUserChange} 
          value={currentUser}
          className="mode-selector"
        >
          <option value="조림핑">관람자 모드</option>
          <option value={lectureData?.instructor}>강사 모드</option>
        </select>

        <section className="lecture-detail-info">
          <div className="lecture-detail-top">
            <img src={lectureData.image} alt={lectureData.title} className="lecture-detail-image" />
            <div className="lecture-detail-info-details">
              <h2>{lectureData.title}</h2>
              <p><strong>일시</strong> {lectureData.date}</p>
              <p><strong>신청</strong> {lectureData.applicationPeriod}</p>
              <p><strong>비용</strong> {lectureData.fee}</p>
              <p><strong>장소</strong> {lectureData.location}</p>
            </div>
          </div>
          <div className="lecture-detail-instructor">
            <img 
              src={lectureData.profileImg || profileDft} 
              alt="강사 프로필" 
              className="instructor-image" 
            />
            <div className="instructor-info">
              <p className="instructor-name">{lectureData.instructor}</p>
              <p className="instructor-date">2025-01-28</p>
            </div>
            <div className="temperature-container">
              <span className="lecture-detail-temperature">{lectureData.instructorTemperature}</span>
              <div className="temperature-bar">
              <div 
              className="temperature-fill" 
              style={{ width: `${getMannerPercentage(lectureData.manner)}%` }}
            ></div>

              </div>
            </div>
          </div>
        </section>
        <div className="lecture-detail-title">
          <h3>강의 설명</h3>
        </div>
        <div className="lecture-detail-description">
          {lectureData?.description ? (
            <ReactMarkdown>{lectureData.description}</ReactMarkdown>
          ) : (
            <p>강의 설명이 없습니다.</p>
          )}
        </div>
        <div className="divider">
          <h3></h3>
        </div>
        <div className="application-status">
          <h3>신청 현황</h3>
          <div className="status-circle">
            <svg width="180" height="180" viewBox="0 0 180 180">
              {/* 배경 원 */}
              <circle
                cx="90"
                cy="90"
                r="80"
                fill="none"
                stroke="#E0E0E0"
                strokeWidth="14"
              />
              {/* 진행도를 나타내는 원 */}
              <circle
                cx="90"
                cy="90"
                r="80"
                fill="none"
                stroke="#216CFA"
                strokeWidth="14"
                strokeDasharray={`${2 * Math.PI * 80}`}
                strokeDashoffset={`${2 * Math.PI * 80 * (1 - calculateProgress(lectureData.participants, lectureData.maximumPeople) / 100)}`}
              />
            </svg>
            <div className="status-text">
              <div className="status-number">{lectureData.participants}/{lectureData.maximumPeople}명</div>
              <div className="status-subtext">최소 인원 {lectureData.minimumPeople}명</div>
            </div>
          </div>
          <div className="like-info">
            <img 
              src={lectureData.isHearted ? jjimedIcon : jjimIcon} 
              alt={lectureData.isHearted ? "찜됨" : "찜하기"} 
              className="jjimed-icon"
              onClick={toggleHeart}
              style={{ cursor: 'pointer' }}
            />
            <span className="like-count">{lectureData?.likeCount || 0}</span>
          </div>
        </div>
        
        {/* 문의하기 섹션 수정 */}
        <div className={`inquiry-button-section ${!isOwner ? 'viewer-mode' : ''}`}>
          <h3>문의하기</h3>
          <div className="inquiry-button-wrapper">
            <button 
              className="inquiry-button"
              onClick={handleInquiryClick}
            >
              문의 전체보기
            </button>
          </div>
          {/* 작성자가 아닐 때만 신청하기 버튼 표시 */}
          {!isOwner && (
            <div className="apply-button-container">
              <button 
                className={`apply-button ${lectureData.isReserved ? 'cancel' : ''}`}
                onClick={handleReservation}
              >
                {lectureData.isReserved ? '신청취소' : '신청하기'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LectureDetailPage;
