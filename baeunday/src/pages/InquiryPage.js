import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import InquiryHeader from '../components/InquiryHeader';
import InquirySection from '../components/InquirySection';
import InquiryModal from '../components/InquiryModal';
import '../css/inquiryPage.css';

const InquiryPage = () => {
  const { lectureId } = useParams();
  const location = useLocation();
  const { lectureData, currentUser } = location.state;
  const [inquiries, setInquiries] = useState(lectureData.inquiries);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInquirySubmit = (newInquiry) => {
    // 새 문의를 inquiries 배열의 맨 앞에 추가
    setInquiries([newInquiry, ...inquiries]);
    
    // lectureData의 inquiries도 업데이트
    lectureData.inquiries = [newInquiry, ...inquiries];
  };

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