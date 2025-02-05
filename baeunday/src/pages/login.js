import React, { useState } from "react";
import "../css/login.css"; // CSS 파일 불러오기
import backIcon from "../assets/images/Vector.svg"; // 뒤로가기 아이콘 불러오기

function Login({ onBackClick }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  // ✅ 필수 입력값 검증 상태
  const [errors, setErrors] = useState({
    userId: false,
    password: false,
  });

  // ✅ 입력 시 필수 입력값 에러 해제
  const handleInputChange = (field, value) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: !value.trim(), // 값이 있으면 false, 없으면 true
    }));
  };

  // ✅ 아이디 입력
  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
    handleInputChange("userId", e.target.value);
  };

  // ✅ 비밀번호 입력
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    handleInputChange("password", e.target.value);
  };

  // ✅ 로그인 버튼 클릭 시 검증
  const handleLoginClick = () => {
    let newErrors = {
      userId: !userId,
      password: !password,
    };

    setErrors(newErrors);

    // 필수 입력값이 비어있으면 로그인 진행 X
    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

  };

  return (
    <div className="login-container">
      <header className="login-header">
        <div className="header-left">
          <button className="back-button" onClick={onBackClick}>
            <img src={backIcon} alt="뒤로가기" className="back-icon" />
          </button>
        </div>
        <h1>로그인</h1>
      </header>

      <form className="login-form">
        {/* 아이디 입력 */}
        <div className={`input-group ${errors.userId ? "error" : ""}`}>
          <label>아이디<span className="required">*</span></label>
          <input 
            type="text" 
            placeholder="회원가입 때 작성했던 아이디를 입력해주세요"
            value={userId}
            onChange={handleUserIdChange}
          />
          {errors.userId && <p className="login-error-text">⚠ 필수 입력 항목입니다.</p>}
        </div>

        {/* 비밀번호 입력 */}
        <div className={`input-group ${errors.password ? "error" : ""}`}>
          <label>비밀번호<span className="required">*</span></label>
          <input 
            type="password" 
            placeholder="회원가입 때 작성했던 비밀번호를 입력해주세요"
            value={password}
            onChange={handlePasswordChange}
          />
          {errors.password && <p className="login-error-text">⚠ 필수 입력 항목입니다.</p>}
        </div>

        {/* 로그인 버튼 */}
        <button type="button" className="login-button" onClick={handleLoginClick}>
          로그인 하기
        </button>
      </form>
    </div>
  );
}

export default Login;
