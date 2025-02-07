import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import InquiryHeader from './InquiryHeader';
import InquirySection from './InquirySection';
import '../css/inquiryPage.css';
import LectureHeader from './LectureHeader';

const InquiryPage = () => {
  const { lectureId } = useParams();
  const location = useLocation();
  const lectureData = location.state?.lectureData;
  const currentUser = location.state?.currentUser || '현재 사용자';

  if (!lectureData) return <div>강의를 찾을 수 없습니다.</div>;

  return (
    
    <div className="inquiry-page">
      
        <InquiryHeader />
      <div className="inquiry-content">
        <InquirySection 
          lectureData={lectureData}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
};

export default InquiryPage; 