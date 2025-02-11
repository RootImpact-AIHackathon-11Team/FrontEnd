import React, { useState } from 'react';
import '../css/LecturePreview.css';
import backIcon from '../assets/images/Vector.svg';
import lectureIcon from '../assets/images/lecture.svg';
import warningIcon from '../assets/images/느낌표.svg'; 

const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return (
    <div style={{ color: 'red' }}>
      {message}
    </div>
  );
};

const LecturePreview = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    thumbnail: '',
    title: '홈베이킹 기초 클래스',
    objective: '지역 특산물을 활용한 디저트 만들기',
    description: '기초 제빵 기술과 지역 특산물을 활용한 응용법을 배운다.',
    date: '2025.02.12 12:00~16:00',
    registration: '2024.12.02 00:00 ~ 2024.12.30 17:00',
    cost: '₩ 100,000',
    location: '어벤더치카페 구미금오공대점',
    minPeople: '최소 5명',
    maxPeople: '최대 30명'
  });

  const [touched, setTouched] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [imageSelected, setImageSelected] = useState(false);

  if (!isOpen) return null; 

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const isFieldEmpty = (value) => !value || value.trim() === '';

  const getFieldError = (field) => {
    if (touched[field] && isFieldEmpty(formData[field])) {
      return "필수 입력 항목입니다.";
    }
    return "";
  };

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
                className={getFieldError('title') ? 'error' : ''}
              />
              {getFieldError('title') && <ErrorMessage message={getFieldError('title')} />}
            </div>
          </div>

          <div className="input-row">
            <span className="label">강의목표</span>
            <div className="input-wrapper">
              <input 
                type="text" 
                value={formData.objective}
                onChange={(e) => setFormData({...formData, objective: e.target.value})}
                onBlur={() => handleBlur('objective')}
                className={getFieldError('objective') ? 'error' : ''}
              />
              {getFieldError('objective') && <ErrorMessage message={getFieldError('objective')} />}
            </div>
          </div>

          <div className="input-row">
            <span className="label">강의개요</span>
            <div className="input-wrapper">
              <input 
                type="text" 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                onBlur={() => handleBlur('description')}
                className={getFieldError('description') ? 'error' : ''}
              />
              {getFieldError('description') && <ErrorMessage message={getFieldError('description')} />}
            </div>
          </div>
        </div>

        <div className="lecture-info-section">
          <h3 className="section-title">강의 정보<span className="required">*</span></h3>
          
          <div className="input-row-2">
            <span className="label">일시</span>
            <input 
              type="text" 
              value={formData.date}
              readOnly
            />
          </div>
          
          <div className="input-row-2">
            <span className="label">신청</span>
            <input 
              type="text" 
              value={formData.registration}
              readOnly
            />
          </div>
          
          <div className="input-row-2">
            <span className="label">비용</span>
            <input 
              type="text" 
              value={formData.cost}
              readOnly
            />
          </div>
          
          <div className="input-row-2">
            <span className="label">장소</span>
            <input 
              type="text" 
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              onBlur={() => handleBlur('location')}
              className={getFieldError('location') ? 'error' : ''}
              placeholder="필수 입력 항목입니다."
            />
            {getFieldError('location') && <ErrorMessage message={getFieldError('location')} />}
          </div>
          
          <div className="input-row people-row">
            <label className="label">인원</label>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ flex: 1, marginRight: '10px' }}>
                <input 
                  type="text" 
                  value={formData.minPeople}
                  readOnly
                />
              </div>
              <div style={{ flex: 1 }}>
                <input 
                  type="text" 
                  value={formData.maxPeople}
                  readOnly
                />
              </div>
            </div>
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
