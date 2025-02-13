import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/lectureDetail.css';
import LectureHeader from './LectureHeader';
import InquirySection from './InquirySection'; 
import ReactMarkdown from 'react-markdown';

const API_URL = "http://43.202.15.40/posts/";

const getTemperaturePercentage = (temp) => {
  const tempNumber = parseFloat(temp.replace('℃', ''));
  const minTemp = 0;
  const maxTemp = 100; 
  const percentage = ((tempNumber - minTemp) / (maxTemp - minTemp)) * 100;
  return Math.min(100, Math.max(0, percentage));
};

const LectureDetailPage = () => {
  const { lectureId } = useParams();
  const [lectureData, setLectureData] = useState(null);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState('조림핑');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}${lectureId}`, {
      headers: {
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data && data.data && data.data.body) {
        setLectureData(data.data.body);
      } else {
        setError('강의 정보를 찾을 수 없습니다.');
      }
    })
    .catch(err => setError('데이터를 불러오는 중 오류 발생'));
  }, [lectureId]);

  const calculateProgress = (current, total) => {
    return (current / total) * 100;
  };

  if (error) return <div>Error: {error}</div>;
  if (!lectureData) return <div>Loading...</div>;

  return (
    <div className="lecture-detail-wrapper">
      <div className="lecture-detail-container">
        <LectureHeader isInstructor={currentUser === lectureData.user.name} />
        <section className="lecture-detail-info">
          <div className="lecture-detail-top">
            <img src={lectureData.imgURL} alt={lectureData.title} className="lecture-detail-image" />
            <div className="lecture-detail-info-details">
              <h2>{lectureData.title}</h2>
              <p><strong>일시</strong> {lectureData.startDate} ~ {lectureData.endDate}</p>
              <p><strong>비용</strong> {lectureData.fee}원</p>
              <p><strong>장소</strong> {lectureData.province} {lectureData.city} {lectureData.address}</p>
            </div>
          </div>
          <div className="lecture-detail-instructor">
            <img 
              src={lectureData.user.profileImgURL} 
              alt="강사 프로필" 
              className="instructor-image" 
            />
            <div className="instructor-info">
              <p className="instructor-name">{lectureData.user.name}</p>
            </div>
          </div>
        </section>
        <div className="lecture-detail-title">
          <h3>강의 설명</h3>
        </div>
        <div className="lecture-detail-description">
          <ReactMarkdown>{lectureData.content}</ReactMarkdown>
        </div>
        <div className="application-status">
          <h3>신청 현황</h3>
          <div className="status-circle">
            <svg width="180" height="180" viewBox="0 0 180 180">
              <circle cx="90" cy="90" r="80" fill="none" stroke="#E0E0E0" strokeWidth="14" />
              <circle cx="90" cy="90" r="80" fill="none" stroke="#216CFA" strokeWidth="14" 
                strokeDasharray={`${2 * Math.PI * 80}`} 
                strokeDashoffset={`${2 * Math.PI * 80 * (1 - calculateProgress(lectureData.participants, lectureData.maximumPeople) / 100)}`} 
              />
            </svg>
            <div className="status-text">
              <div className="status-number">{lectureData.participants}/{lectureData.maximumPeople}명</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureDetailPage;