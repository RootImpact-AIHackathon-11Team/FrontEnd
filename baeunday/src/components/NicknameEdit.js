import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/NicknameEdit.css';
import backIcon from '../assets/images/Vector.svg';
import warningIcon from '../assets/images/느낌표.svg';

const NicknameEdit = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const currentNickname = 'abc';

  const handleBack = () => {
    navigate('/mypage');
  };

  const handleCheckDuplicate = () => {
    if (!nickname) {
      setErrorMessage('필수 입력 항목입니다.');
      setSuccessMessage('');
    } else if (nickname === currentNickname) {
      setErrorMessage('이미 사용중인 닉네임입니다.');
      setSuccessMessage('');
    } else {
      setErrorMessage('');
      setSuccessMessage('사용 가능한 닉네임입니다.');
    }
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleSubmit = () => {
    if (!nickname.trim()) {
      setErrorMessage('필수 입력 항목입니다.');
      setSuccessMessage('');
    } else if (nickname === currentNickname) {
      setErrorMessage('이미 사용중인 닉네임입니다.');
      setSuccessMessage('');
    } else {
      alert("닉네임이 성공적으로 변경되었습니다.");
      navigate('/mypage');
    }
  };

  return (
    <div className="nickname-container">
      <div className="nickname-header">
        <img src={backIcon} alt="뒤로가기" className="nickname-back-button" onClick={handleBack} />
        <h1 className="nickname-header-title">닉네임 변경</h1>
      </div>
      <div className="nickname-content">
        <h2 className="nickname-title">새로운 닉네임을 입력해주세요</h2>
        <div className="nickname-input-wrapper">
          <input
            type="text"
            className="nickname-input"
            placeholder="닉네임 입력"
            value={nickname}
            onChange={handleNicknameChange}
          />
          <button className={`nickname-confirm-button ${nickname ? 'active' : ''}`} onClick={handleCheckDuplicate}>
            중복 확인
          </button>
        </div>
        <div className="nickname-error-message-wrapper">
          {errorMessage && <p className="nickname-error-message"><span className="icon-wrapper"><img src={warningIcon} alt="경고표시" className="nickname-warning-icon"/></span>{errorMessage}</p>}
          {successMessage && <p className="nickname-success-message"><span className="icon-wrapper"><img src={warningIcon} alt="경고표시" className="nickname-warning-icon"/></span>{successMessage}</p>}
        </div>
      </div>
      <div className="nickname-bottom-button-wrapper">
        <button className="nickname-change-button" onClick={handleSubmit}>
          변경하기
        </button>
      </div>
    </div>
  );
};

export default NicknameEdit;
