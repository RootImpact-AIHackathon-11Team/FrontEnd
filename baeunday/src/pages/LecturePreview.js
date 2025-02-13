import React, { useState } from 'react';
import '../css/LecturePreview.css';
import backIcon from '../assets/images/Vector.svg';
import lectureIcon from '../assets/images/lecture.svg';
import warningIcon from '../assets/images/느낌표.svg'; 


const LecturePreview = ({ isOpen, onClose, data }) => {
  console.log('Lecture preview');
  const [formData, setFormData] = useState({
    thumbnail: '',
    title: data?.subject || '',
    objective: data?.goal || '',
    description: data?.syllabus || '',
    date: `${data?.startDate || ''} ${data?.time || ''}`,
    registration: data?.registrationPeriod || '',
    cost: data?.fee ? `₩ ${data?.fee.toLocaleString()}` : '무료',
    location: data?.location || '',
    minPeople: `최소 ${data?.minP || 0}명`,
    maxPeople: `최대 ${data?.maxP || 0}명`,
    gptContent: data?.gptContent || ''
  });

  const [touched, setTouched] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [imageSelected, setImageSelected] = useState(false);

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const isFieldEmpty = (value) => !value || value.trim() === '';

  const handleSubmit = () => {
    setShowErrors(true);
    if (!imageSelected || !formData.title || !formData.objective || !formData.description || !formData.location) {
      return;
    }
    console.log('제출 성공:', formData);
  };

  return (
    <div className="preview-container">
      <div className="preview-header">
        <button className="lecture-preview-back-button" onClick={onClose}>
          <img src={backIcon} alt="뒤로가기" />
        </button>
        <h1 className="preview-title">강의 기획서 등록하기</h1>
      </div>

      <div className="preview-content">
        <div className="preview-profile">
          <div className={`thumbnail-box ${showErrors && !imageSelected ? 'error' : ''}`}>
            <img src={lectureIcon} alt="강의 썸네일" className="lecture-icon" />
            <span className="thumbnail-text">강의 썸네일 등록</span>
          </div>
          
          {showErrors && !imageSelected && (
            <div className="error-message"><img src={warningIcon} alt="Warning" />필수 입력 항목입니다.</div>
          )}
          <div className="user-info">
            <h2>
              <span className="username-blue">컴공사이에피어난전쟁통</span>
              <span className="username-black">님</span>
            </h2>
            <p>강의 기획서를 작성해 주세요</p>
          </div>
        </div>

        <div className="lecture-subject-section">
          <h3 className="section-title">
            강의주제
            <span className="required">*</span>
          </h3>
          <div className="input-row">
            <span className="label">강의명</span>
            <div className="input-wrapper">
              
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                onBlur={() => handleBlur('title')}
              />
              <div className="error-message"><img src={warningIcon} alt="Warning" />필수 입력 항목입니다.</div>
            </div>
          </div>
        </div>

        <div className="lecture-info-section">
          <h3 className="section-title">강의 정보<span className="required">*</span></h3>
          <div className="input-row-2">
            
            <span className="label">일시</span>
            <input type="text" value={formData.date} />
            <div className="error-message"><img src={warningIcon} alt="Warning" />필수 입력 항목입니다.</div>
          </div>
          <div className="input-row-2">
            <span className="label">신청</span>
            <input type="text" value={formData.registration} />
            <div className="error-message"><img src={warningIcon} alt="Warning" />필수 입력 항목입니다.</div>
          </div>
          <div className="input-row-2">
            <span className="label">비용</span>
            <input type="text" value={formData.cost} />
            <div className="error-message"><img src={warningIcon} alt="Warning" />필수 입력 항목입니다.</div>
          </div>
          <div className="input-row-2">
            <span className="label">장소</span>
            <input type="text" value={formData.cost} />
            <div className="error-message"><img src={warningIcon} alt="Warning" />필수 입력 항목입니다.</div>
          </div>
        </div>

        <div className="preview-bottom-button-wrapper">
          <button className="preview-submit-button" onClick={handleSubmit}>
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default LecturePreview;
