import React, { useState } from "react";
import "../css/signup.css"; // CSS 파일 불러오기
import backIcon from "../assets/images/Vector.svg"; // ✅ 뒤로가기 아이콘 불러오기
import exMark from "../assets/images/느낌표.svg"
import { useNavigate } from 'react-router-dom'; // useNavigate import 추가

function Signup() {
  const navigate = useNavigate(); // useNavigate 훅 추가
  const API_BASE_URL = 'http://43.202.15.40';
  const [nickname, setNickname] = useState("");
  const [intro, setIntro] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  // ✅ 닉네임 & 아이디 중복 확인 상태
  const [isNicknameValid, setIsNicknameValid] = useState(null);
  const [nicknameError, setNicknameError] = useState("");
  const [isUserIdValid, setIsUserIdValid] = useState(null);
  const [userIdError, setUserIdError] = useState("");

  // ✅ 필수 입력값 검증 상태
  const [errors, setErrors] = useState({
    nickname: false,
    intro: false,
    userId: false,
    password: false,
  });

  // ✅ successName과 successUsername 상태 추가
  const [successName, setSuccessName] = useState(0);
  const [successUsername, setSuccessUsername] = useState(0);

  // ✅ 입력값 변경 시 오류 상태 해제
  const handleInputChange = (field, value) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: !value.trim(), // 값이 있으면 false, 없으면 true
    }));
  };

  // ✅ 닉네임 입력 시 오류 상태 초기화 & 중복 확인 버튼 활성화
  const handleNicknameChange = (e) => {
    const value = e.target.value;
    setNickname(value);
    setSuccessName(0); // 입력값 변경 시 중복 확인 상태 초기화
    setNicknameError("");
    handleInputChange("nickname", value);
  };

  // ✅ 아이디 입력 시 오류 상태 초기화 & 중복 확인 버튼 활성화
  const handleUserIdChange = (e) => {
    const value = e.target.value;
    setUserId(value);
    setSuccessUsername(0); // 입력값 변경 시 중복 확인 상태 초기화
    setUserIdError("");
    handleInputChange("userId", value);
  };

  // ✅ 한 줄 소개 입력
  const handleIntroChange = (e) => {
    setIntro(e.target.value);
    handleInputChange("intro", e.target.value);
  };

  // ✅ 비밀번호 입력
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    handleInputChange("password", e.target.value);
  };

  // ✅ 닉네임 중복 확인 기능
  const handleCheckNickname = async () => {
    try {
      const requestBody = {
        checkname: nickname
      };
      console.log('닉네임 중복 확인 요청:', requestBody);

      const response = await fetch(`${API_BASE_URL}/user/check-name`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      
      console.log('닉네임 중복 확인 응답 상태:', response.status);
      const data = await response.json();
      console.log('닉네임 중복 확인 응답 데이터:', data);
      
      setSuccessName(data.successName);
      setNicknameError(data.message);
      
    } catch (error) {
      console.error('닉네임 중복 확인 중 오류:', error);
      setNicknameError("중복 확인 중 오류가 발생했습니다.");
      setSuccessName(0);
    }
  };

  // ✅ 아이디 중복 확인 기능
  const handleCheckUserId = async () => {
    try {
      const requestBody = {
        checkname: userId
      };
      console.log('아이디 중복 확인 요청:', requestBody);

      const response = await fetch(`${API_BASE_URL}/user/check-username`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      
      console.log('아이디 중복 확인 응답 상태:', response.status);
      const data = await response.json();
      console.log('아이디 중복 확인 응답 데이터:', data);
      
      setSuccessUsername(data.successUserName);
      setUserIdError(data.message);
      
    } catch (error) {
      console.error('아이디 중복 확인 중 오류:', error);
      setUserIdError("중복 확인 중 오류가 발생했습니다.");
      setSuccessUsername(0);
    }
  };

  // ✅ 회원가입 버튼 클릭 시 처리
  const handleSignupClick = async () => {
    // 현재 상태값들 로깅
    console.log('현재 상태값:', {
      nickname,
      userId,
      password,
      intro,
      successName,
      successUsername
    });

    // 입력값 검증
    if (!nickname || !userId || !password || !intro) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    // 중복 확인 검증
    if (successName !== 1 || successUsername !== 1) {
      console.log('중복 확인 상태:', {
        successName,
        successUsername
      });
      alert("닉네임과 아이디 중복 확인이 필요합니다.");
      return;
    }

    try {
      const requestBody = {
        name: nickname,
        username: userId,
        password: password,
        field: intro,
        successName: successName,
        successUsername: successUsername
      };
      
      // 요청 데이터 상세 로깅
      console.log('회원가입 요청 데이터:', {
        URL: `${API_BASE_URL}/user/register`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody
      });

      const response = await fetch(`${API_BASE_URL}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('서버 응답 상태:', response.status);
      const data = await response.json();
      console.log('서버 응답 데이터:', data);

      if (response.ok) {
        alert("회원가입이 완료되었습니다.");
        navigate('/login');
      } else {
        throw new Error(data.message || "회원가입 처리 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error('회원가입 중 오류:', error);
      alert(error.message);
    }
  };

  // 뒤로가기 핸들러 추가
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="signup-container">
      <header className="signup-header">
        <div className="header-left">
          <button className="back-button" onClick={handleBack}>
            <img src={backIcon} alt="뒤로가기" className="back-icon" />
          </button>
        </div>
        <h1>회원가입</h1>
      </header>

      <form className="signup-form">
        {/* 닉네임 입력 */}
        <div className={`input-group ${errors.nickname ? "error" : ""}`}>
          <label>닉네임<span className="required">*</span></label>
          <div className="input-row">
            <input 
              type="text" 
              placeholder="강사, 수강생으로 활동할 닉네임을 입력해주세요"
              value={nickname}
              onChange={handleNicknameChange}
              className={errors.nickname ? "error-input" : ""}
            />
            <button 
              type="button" 
              className={`check-button ${nickname ? "active" : ""}`} 
              onClick={handleCheckNickname}
              disabled={!nickname}
            >
              중복 확인
            </button>
          </div>
          {nicknameError && <p className={`signup-error-text ${isNicknameValid ? "valid-text" : ""}`}>{nicknameError}</p>}
          {errors.nickname && !nickname && <p className="signup-error-text"><img src={exMark} alt="느낌표" className="ex-mark"/> 필수 입력 항목입니다.</p>}
        </div>

        {/* 한 줄 소개 */}
        <div className={`input-group ${errors.intro ? "error" : ""}`}>
          <label>한 줄 소개<span className="required">*</span></label>
          <input 
            type="text" 
            placeholder="수강생들이 신뢰할 수 있는 소개 글을 작성해주세요" 
            value={intro}
            onChange={handleIntroChange}
          />
          {errors.intro && !intro && <p className="signup-error-text"><img src={exMark} alt="느낌표" className="ex-mark"/> 필수 입력 항목입니다.</p>}
        </div>

        {/* 아이디 입력 */}
        <div className={`input-group ${errors.userId ? "error" : ""}`}>
          <label>아이디<span className="required">*</span></label>
          <div className="input-row">
            <input 
              type="text" 
              placeholder="로그인할 때 사용할 아이디를 입력해주세요"
              value={userId}
              onChange={handleUserIdChange}
            />
            <button 
              type="button" 
              className={`check-button ${userId ? "active" : ""}`} 
              onClick={handleCheckUserId}
              disabled={!userId}
            >
              중복 확인
            </button>
          </div>
          {userIdError && <p className={`signup-error-text ${isUserIdValid ? "valid-text" : ""}`}>{userIdError}</p>}
          {errors.userId && !userId && <p className="signup-error-text"><img src={exMark} alt="느낌표" className="ex-mark" />필수 입력 항목입니다.</p>}
        </div>

        {/* 비밀번호 입력 */}
        <div className={`input-group ${errors.password ? "error" : ""}`}>
          <label>비밀번호<span className="required">*</span></label>
          <input 
            type="password" 
            placeholder="로그인할 때 사용할 비밀번호를 입력해주세요" 
            value={password}
            onChange={handlePasswordChange}
          />
          {errors.password && !password && <p className="signup-error-text"><img src={exMark} alt="느낌표" className="ex-mark"/>필수 입력 항목입니다.</p>}
        </div>

        {/* 가입하기 버튼 */}
        <button type="button" className="signup-button" onClick={handleSignupClick}>
          가입하기
        </button>
      </form>
    </div>
  );
}

export default Signup;
