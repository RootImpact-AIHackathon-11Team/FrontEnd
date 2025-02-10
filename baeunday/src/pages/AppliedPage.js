import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/applied.css';
import AppliedHeader from '../components/AppliedHeader';
import dropdownIcon from '../assets/images/dropdown.svg';
import questionIcon from '../assets/images/question.svg';
import ActionSheet from '../components/ActionSheet';
import mainEx1 from '../assets/examples/mainEx1.png';
import AppliedModal from '../components/AppliedModal';
import CancelConfirmModal from '../components/CancelConfirmModal';
import BottomNavigation from '../components/BottomNavigation';

// 신청한 강의 더미 데이터 수정
const appliedLectures = [
  {
    id: 1,
    date: '신청일 25.01.28',
    title: '"디자인이 제일 쉬웠어요" - 하루만에 배우는 디자인 철학',
    location: '구미시 거여동',
    dDay: 99,
    price: '무료',
    status: '참가확정',
    image: mainEx1,
    isCompleted: false  // 수강 완료 여부
  },
  {
    id: 2,
    date: '신청일 25.01.01',
    title: '"꽃... 좋아하세요?" 꽃처럼 아름다운 사장이 알려주는 꽃꽂이',
    location: '구미시 사곡동',
    dDay: 50,
    price: '25,000원',
    status: '결제예정',
    isCompleted: false
  },
  {
    id: 6,
    date: '신청일 23.12.10',
    title: '크리스마스 쿠키 원데이 클래스',
    location: '구미시 원평동',
    dDay: 0,
    price: '50,000원',
    status: '참가확정',
    isCompleted: true  // 이미 수강 완료된 강의
  }
];

const AppliedPage = () => {
  const navigate = useNavigate();
  const [activeAppliedFilter, setActiveAppliedFilter] = useState('전체');
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedLectureId, setSelectedLectureId] = useState(null);

  const handleAppliedFilterClick = () => {
    setSheetOpen(true);
  };

  const handleSelect = (value) => {
    setActiveAppliedFilter(value);
    setSheetOpen(false);
  };

  const sheetOptions = [
    { label: '전체', value: '전체', selected: activeAppliedFilter === '전체' },
    { label: '참가확정', value: '참가확정', selected: activeAppliedFilter === '참가확정' },
    { label: '결제예정', value: '결제예정', selected: activeAppliedFilter === '결제예정' }
  ];

  const handleLectureClick = (lectureId) => {
    navigate(`/lecture/${lectureId}`);
  };

  const handleReviewClick = (lectureId) => {
    navigate(`/review/${lectureId}`);
  };

  const handleCancelClick = (lectureId) => {
    setSelectedLectureId(lectureId);
    setShowCancelModal(true);
  };

  const handleCancelConfirm = () => {
    // 여기에 실제 취소 로직 구현
    console.log(`강의 ${selectedLectureId} 취소`);
    setShowCancelModal(false);
  };

  return (
    <div className="applied-container">
      <AppliedHeader />

      <div className="applied-filter-wrap">
        <button 
          className="applied-filter-btn"
          onClick={handleAppliedFilterClick}
        >
          {activeAppliedFilter}
          <img src={dropdownIcon} alt="드롭다운" />
        </button>
        <img 
          src={questionIcon} 
          alt="도움말" 
          className="question-icon"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      <main className="applied-content">
        {appliedLectures.map((lecture) => (
          <div
            key={lecture.id}
            className="applied-card"
            onClick={() => handleLectureClick(lecture.id)}
          >
            <div className="applied-date-row">
              <div className="applied-date">{lecture.date}</div>
              <span className={`status-badge ${lecture.status === '참가확정' ? 'confirmed' : 'pending'}`}>
                {lecture.status}
              </span>
            </div>
            <div className="applied-card-main">
              <div className="applied-card-image">
                <img src={lecture.image} alt={lecture.title} />
              </div>
              <div className="applied-card-info">
                <h2>{lecture.title}</h2>
                <p>{lecture.location} · D-{lecture.dDay} · {lecture.price}</p>
              </div>
            </div>
            <div className="applied-card-footer">
              <button 
                className={`action-button ${lecture.isCompleted ? 'review' : 'cancel'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  lecture.isCompleted ? handleReviewClick(lecture.id) : handleCancelClick(lecture.id);
                }}
              >
                {lecture.isCompleted ? '후기 작성' : '신청 취소'}
              </button>
            </div>
          </div>
        ))}
      </main>

      {isSheetOpen && (
        <ActionSheet
          options={sheetOptions}
          onSelect={handleSelect}
          onClose={() => setSheetOpen(false)}
        />
      )}

      {isModalOpen && <AppliedModal onClose={() => setIsModalOpen(false)} />}

      {showCancelModal && (
        <CancelConfirmModal 
          onClose={() => setShowCancelModal(false)}
          onConfirm={handleCancelConfirm}
        />
      )}

      <BottomNavigation />
    </div>
  );
};

export default AppliedPage; 