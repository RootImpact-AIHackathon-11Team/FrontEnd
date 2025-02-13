import React, { useState } from 'react';
import '../css/LecturePreview.css';
import backIcon from '../assets/images/Vector.svg';
import lectureIcon from '../assets/images/lecture.svg';
import warningIcon from '../assets/images/느낌표.svg';

const LecturePreview = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    registrationPeriod: '',
    fee: '',
    location: '',
    minPeople: '',
    maxPeople: ''
  });

  const [showErrors, setShowErrors] = useState(false);
  const [imageSelected, setImageSelected] = useState(false);

  // 신청하기 버튼 클릭 핸들러
  const handleSubmit = () => {
    setShowErrors(true);  // 에러 표시 활성화
  };

  // 입력 필드가 비어있는지 확인하는 함수
  const isFieldEmpty = (value) => {
    return !value || value.trim() === '';
  };

  // 강의정보의 모든 필드가 입력되었는지 확인하는 함수
  const hasEmptyInfoFields = () => {
    return ['title', 'date', 'registrationPeriod', 'fee', 'location', 'minPeople', 'maxPeople']
      .some(field => isFieldEmpty(formData[field]));
  };

  return (
    <div className="preview-container">
      <div className="preview-header">
        <button className="back-button" onClick={onClose}>
          <img src={backIcon} alt="뒤로가기" />
        </button>
        <h1>강의 기획서 등록하기</h1>
      </div>

      <div className="preview-content">
        {/* 프로필 섹션 */}
        <div className="profile-section">
          <div className="thumbnail-section">
            <div className={`thumbnail-box ${showErrors && !imageSelected ? 'error' : ''}`}>
              <img src={lectureIcon} alt="강의 포스터 등록" />
              <span>강의 포스터 등록</span>
            </div>
            {showErrors && !imageSelected && (
              <div className="error-message">
                <img src={warningIcon} alt="경고" />
                필수 입력 항목입니다.
              </div>
            )}
          </div>
          <div className="profile-info">
            <h2>
              <span className="blue-text">컴공사이에피어난전쟁통</span>
              <span>님</span>
            </h2>
            <p>강의 기획서를 작성해 주세요</p>
          </div>
        </div>

        {/* 강의 정보 섹션 */}
        <div className="section">
          <h3>강의정보<span className="required">*</span></h3>
          <div className="input-group">
            <label>제목</label>
            <input 
              type="text" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className={showErrors && isFieldEmpty(formData.title) ? 'error' : ''}
            />
          </div>
          <div className="input-group">
            <label>일시</label>
            <input 
              type="text" 
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className={showErrors && isFieldEmpty(formData.date) ? 'error' : ''}
            />
          </div>
          <div className="input-group">
            <label>신청</label>
            <input 
              type="text" 
              value={formData.registrationPeriod}
              onChange={(e) => setFormData({...formData, registrationPeriod: e.target.value})}
              className={showErrors && isFieldEmpty(formData.registrationPeriod) ? 'error' : ''}
            />
          </div>
          <div className="input-group">
            <label>비용</label>
            <input 
              type="text" 
              value={formData.fee}
              onChange={(e) => setFormData({...formData, fee: e.target.value})}
              className={showErrors && isFieldEmpty(formData.fee) ? 'error' : ''}
            />
          </div>
          <div className="input-group">
            <label>장소</label>
            <input 
              type="text" 
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className={showErrors && isFieldEmpty(formData.location) ? 'error' : ''}
            />
          </div>
          <div className="input-group">
            <label>인원</label>
            <div className="people-inputs">
              <input 
                type="text" 
                value={formData.minPeople}
                onChange={(e) => setFormData({...formData, minPeople: e.target.value})}
                placeholder="최소 5명"
                className={showErrors && isFieldEmpty(formData.minPeople) ? 'error' : ''}
              />
              <input 
                type="text" 
                value={formData.maxPeople}
                onChange={(e) => setFormData({...formData, maxPeople: e.target.value})}
                placeholder="최대 30명"
                className={showErrors && isFieldEmpty(formData.maxPeople) ? 'error' : ''}
              />
            </div>
            <div className="preview-button-container">
              <button className="preview-button" onClick={handleSubmit}>
                신청하기
              </button>
            </div>
          </div>
          {showErrors && hasEmptyInfoFields() && (
            <div className="info-error-message">
              <img src={warningIcon} alt="경고" />
              필수 입력 항목입니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LecturePreview;
