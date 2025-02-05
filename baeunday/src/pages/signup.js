import React, { useState } from "react";
import "../css/signup.css"; // CSS 파일 불러오기
import backIcon from "../assets/images/Vector.svg"; // ✅ 뒤로가기 아이콘 불러오기
import exMark from "../assets/images/느낌표.svg"

function Signup({ onBackClick }) {
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

  // ✅ 입력값 변경 시 오류 상태 해제
  const handleInputChange = (field, value) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: !value.trim(), // 값이 있으면 false, 없으면 true
    }));
  };

  // ✅ 닉네임 입력 시 오류 상태 초기화 & 중복 확인 버튼 활성화
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setIsNicknameValid(null);
    setNicknameError("");
    handleInputChange("nickname", e.target.value);
  };

  // ✅ 아이디 입력 시 오류 상태 초기화 & 중복 확인 버튼 활성화
  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
    setIsUserIdValid(null);
    setUserIdError("");
    handleInputChange("userId", e.target.value);
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
  const handleCheckNickname = () => {
    const existingNicknames = ["testuser", "john123", "nickname1"];

    if (existingNicknames.includes(nickname)) {
      setIsNicknameValid(false);
      setNicknameError("이미 사용 중인 닉네임입니다.");
    } else {
      setIsNicknameValid(true);
      setNicknameError("사용 가능한 닉네임입니다.");
    }
  };

  // ✅ 아이디 중복 확인 기능
  const handleCheckUserId = () => {
    const existingUserIds = ["user123", "admin", "testaccount"];

    if (existingUserIds.includes(userId)) {
      setIsUserIdValid(false);
      setUserIdError("이미 사용 중인 아이디입니다.");
    } else {
      setIsUserIdValid(true);
      setUserIdError("사용 가능한 아이디입니다.");
    }
  };

  // ✅ 회원가입 버튼 클릭 시 필수 입력값 검증
  const handleSignupClick = () => {
    let newErrors = {
      nickname: !nickname.trim(),
      intro: !intro.trim(),
      userId: !userId.trim(),
      password: !password.trim(),
    };

    setErrors(newErrors);

    // 필수 입력값이 하나라도 없으면 에러 메시지를 표시
    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    // 닉네임 또는 아이디가 중복되었을 경우 회원가입 불가
    if (isNicknameValid === false || isUserIdValid === false) {
      alert("닉네임 또는 아이디가 중복되었습니다.");
      return;
    }

    alert("회원가입이 완료되었습니다.");
  };

  return (
    <div className="signup-container">
      <header className="signup-header">
        <div className="header-left">
          <button className="back-button" onClick={onBackClick}>
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
