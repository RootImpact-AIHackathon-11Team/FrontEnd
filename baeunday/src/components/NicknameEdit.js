import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/NicknameEdit.css';
import backIcon from '../assets/images/Vector.svg';
import warningIcon from '../assets/images/느낌표.svg';

const NicknameEdit = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  // 중복 확인 결과 (0: 미확인/실패, 1: 성공)
  const [duplicateCheckSuccess, setDuplicateCheckSuccess] = useState(0);

  // 뒤로가기 핸들러
  const handleBack = () => {
    navigate('/mypage');
  };

  // 닉네임 입력 변경 시 상태 초기화
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setErrorMessage('');
    setSuccessMessage('');
    setDuplicateCheckSuccess(0);
  };

  // 중복 검사 API 호출 (/user/login-check-name)
  const handleCheckDuplicate = async () => {
    if (!nickname.trim()) {
      setErrorMessage('필수 입력 항목입니다.');
      setSuccessMessage('');
      setDuplicateCheckSuccess(0);
      return;
    }

    // 로그인한 사용자인지 토큰 확인 (토큰이 없으면 인증 실패)
    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('로그인이 필요합니다.');
      setSuccessMessage('');
      return;
    }

    try {
      const response = await fetch('http://43.202.15.40/user/login-check-name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ checkname: nickname }),
      });
      const data = await response.json();

      if (response.ok && data.successName === 1) {
        // 중복되지 않은 닉네임이면 successName이 1로 반환됨
        setErrorMessage('');
        setSuccessMessage(data.message || '사용 가능한 닉네임입니다.');
        setDuplicateCheckSuccess(data.successName); // 1
      } else {
        // 중복된 닉네임이거나 기타 오류 처리
        setErrorMessage(data.message || '닉네임 중복 확인 실패');
        setSuccessMessage('');
        setDuplicateCheckSuccess(0);
      }
    } catch (error) {
      console.error('닉네임 중복 확인 에러:', error);
      setErrorMessage('서버 오류 발생');
      setSuccessMessage('');
      setDuplicateCheckSuccess(0);
    }
  };

  // 닉네임 변경 API 호출 (/user/profile/name)
  const handleSubmit = async () => {
    if (!nickname.trim()) {
      setErrorMessage('필수 입력 항목입니다.');
      setSuccessMessage('');
      return;
    }
    if (duplicateCheckSuccess !== 1) {
      setErrorMessage('닉네임 중복 확인을 해주세요.');
      setSuccessMessage('');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('로그인이 필요합니다.');
      setSuccessMessage('');
      return;
    }

    // 요청 정보 로깅
    const requestData = {
      name: nickname,
      successName: duplicateCheckSuccess
    };
    console.log('닉네임 변경 Request:', {
      url: 'http://43.202.15.40/user/profile/name',
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: requestData
    });

    try {
      const response = await fetch('http://43.202.15.40/user/profile/name', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });
      const data = await response.json();

      if (response.ok) {
        alert(data.message || '닉네임 수정 완료');
        navigate('/mypage');
      } else {
        setErrorMessage(data.message || '닉네임 수정 실패');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('닉네임 수정 중 에러 발생:', error);
      setErrorMessage('서버 오류 발생');
      setSuccessMessage('');
    }
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
            placeholder="닉네임 입력"
            value={nickname}
            onChange={handleNicknameChange}
          />
          <button
            className={`nickname-confirm-button ${nickname ? 'active' : ''}`}
            onClick={handleCheckDuplicate}
          >
            중복 확인
          </button>
        </div>
        <div className="nickname-error-message-wrapper">
          {errorMessage && (
            <p className="nickname-error-message">
              <span className="icon-wrapper">
                <img
                  src={warningIcon}
                  alt="경고표시"
                  className="nickname-warning-icon"
                />
              </span>
              {errorMessage}
            </p>
          )}
          {successMessage && (
            <p className="nickname-success-message">
              <span className="icon-wrapper">
                <img
                  src={warningIcon}
                  alt="경고표시"
                  className="nickname-warning-icon"
                />
              </span>
              {successMessage}
            </p>
          )}
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
