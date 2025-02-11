import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/DescriptionEdit.css';
import backIcon from '../assets/images/Vector.svg';  // 뒤로가기 아이콘 import

const DescriptionEdit = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');

  const handleBack = () => {
    navigate(-1);  // 뒤로가기 로직
  };

  const handleSubmit = () => {
    if (!description.trim()) {
      alert('한 줄 소개를 입력해주세요.');
      return;
    }
    alert("변경되었습니다.");
    navigate(-1);
  };

  return (
    <div className="description-container">
      <div className="description-header">
        <img src={backIcon} alt="뒤로가기" className="description-back-button" onClick={handleBack} />
        <div className='description-header-title'>한 줄 소개 변경</div>
      </div>
      <div className="description-content">
        <span className="description-input">새로운 한 줄 소개를 입력해주세요</span>
        <input
          id="description-input"
          type="text"
          placeholder="나로 말할 것 같으면~ 자신감 있는 강사~"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <div className="description-button-container">
          <button className="description-button" onClick={handleSubmit}>
            변경하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default DescriptionEdit;
