import React, { useState } from 'react';
import '../css/inquiryModal.css';
import profileDft from '../assets/examples/profileDft1.png';
const InquiryModal = ({ isOpen, onClose, currentUser, onSubmit }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!content.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      
      // 새 문의 객체 생성
      const newInquiry = {
        id: Date.now(),
        user: currentUser,
        date: new Date().toISOString().split('T')[0],
        question: content.trim(),
        profileImg: profileDft,  // 기본 프로필 이미지 사용
        answer: null
      };

      onSubmit(newInquiry); // 부모 컴포넌트로 새 문의 전달
      setContent('');
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>강사님에게 문의하기</h2>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="문의 내용을 입력해주세요"
          className="inquiry-textarea"
          disabled={isSubmitting}
        />
        <div className="modal-buttons">
          <button 
            className="cancel-btn" 
            onClick={onClose}
            disabled={isSubmitting}
          >
            취소
          </button>
          <button 
            className={`submit-btn ${!content.trim() ? 'disabled' : ''}`}
            onClick={handleSubmit}
            disabled={!content.trim() || isSubmitting}
          >
            문의하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default InquiryModal; 