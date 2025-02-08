import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/applied.css';
import AppliedHeader from '../components/AppliedHeader';

// 신청한 강의 더미 데이터
const appliedLectures = [
  {
    id: 1,
    date: '25.01.28',
    title: '"디자인이 제일 쉬웠어요" - 하루만에 배우는 디자인 철학',
    location: '구미시 거여동',
    dDay: 99,
    price: '무료',
    status: '참가확정'
  },
  {
    id: 2,
    date: '25.01.01',
    title: '"꽃... 좋아하세요?" 꽃처럼 아름다운 사장이 알려주는 꽃꽂이',
    location: '구미시 사곡동',
    dDay: 50,
    price: '25,000원',
    status: '결제예정'
  },
  {
    id: 3,
    date: '23.12.10',
    title: '크리스마스 쿠키 원데이 클래스',
    location: '구미시 원평동',
    dDay: 0,
    price: '50,000원',
    status: '참가확정'
  }
];

const AppliedPage = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('전체');

  const handleLectureClick = (lectureId) => {
    navigate(`/lecture/${lectureId}`);
  };

  return (
    <div className="applied-container">
      <AppliedHeader />

      <div className="filter-section">
        <button 
          className={`filter-btn ${selectedFilter === '전체' ? 'active' : ''}`}
          onClick={() => setSelectedFilter('전체')}
        >
          전체
        </button>
      </div>

      <main className="applied-content">
        {appliedLectures.map((lecture) => (
          <div
            key={lecture.id}
            className="applied-card"
            onClick={() => handleLectureClick(lecture.id)}
          >
            <div className="applied-date">{lecture.date}</div>
            <div className="applied-info">
              <h2>{lecture.title}</h2>
              <p>{lecture.location} · D-{lecture.dDay} · {lecture.price}</p>
              <span className={`status-badge ${lecture.status === '참가확정' ? 'confirmed' : 'pending'}`}>
                {lecture.status}
              </span>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default AppliedPage; 