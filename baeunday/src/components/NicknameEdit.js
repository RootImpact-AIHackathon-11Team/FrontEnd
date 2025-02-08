import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/NicknameEdit.css';
import backIcon from '../assets/images/Vector.svg';

const NicknameEdit = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');

  const handleBack = () => {
    navigate('/profile/edit');
  };

  const handleSubmit = () => {
    // 닉네임 업데이트 로직
    navigate('/profile/edit');
  };

  return (
    <div className="nickname-container">
      <div className="nickname-header">
        <img 
          src={backIcon} 
          alt="뒤로가기" 
          className="nickname-back-button"
          onClick={handleBack}
        />
        <h1 className="nickname-header-title">닉네임 변경</h1>
      </div>

      <div className="nickname-content">
        <h2 className="nickname-title">새로운 닉네임을 입력해주세요</h2>
        <div className="nickname-input-wrapper">
          <input
            type="text"
            className="nickname-input"
            placeholder="컴공 사이에 피어난 전쟁통"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <button 
            className="nickname-confirm-button"
            onClick={handleSubmit}
          >
            중복 확인
          </button>
        </div>
      </div>

      <div className="nickname-bottom-button-wrapper">
        <button className="nickname-change-button">
          변경하기
        </button>
      </div>
    </div>
  );
};

export default NicknameEdit;
