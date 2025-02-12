import React, { useState } from "react";
import "../css/login.css"; // CSS 파일 불러오기
import backIcon from "../assets/images/Vector.svg"; // 뒤로가기 아이콘 불러오기
import { useNavigate } from 'react-router-dom';

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 하드코딩된 계정 정보
  const VALID_ID = 'baeunday';
  const VALID_PASSWORD = '1234';

  // ✅ 필수 입력값 검증 상태
  const [errors, setErrors] = useState({
    id: false,
    password: false,
  });

  // ✅ 입력 시 필수 입력값 에러 해제
  const handleInputChange = (field, value) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: !value.trim(), // 값이 있으면 false, 없으면 true
    }));
  };

  // ✅ 아이디 입력 (이메일 대신)
  const handleIdChange = (e) => {
    setId(e.target.value);
    handleInputChange("id", e.target.value);
  };

  // ✅ 비밀번호 입력
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    handleInputChange("password", e.target.value);
  };

  // ✅ 로그인 버튼 클릭 시 검증
  const handleLogin = (e) => {
    e.preventDefault();
    let newErrors = {
      id: !id,
      password: !password,
    };

    setErrors(newErrors);

    // 필수 입력값이 비어있으면 로그인 진행 X
    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    // 아이디와 비밀번호 검증
    if (id === VALID_ID && password === VALID_PASSWORD) {
      navigate('/main');
    } else {
      alert('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <div className="header-left">
          <button className="back-button" onClick={() => navigate(-1)}>
            <img src={backIcon} alt="뒤로가기" className="back-icon" />
          </button>
        </div>
        <h1>로그인</h1>
      </header>

      <form onSubmit={handleLogin} className="login-form">
        {/* 아이디 입력 (이메일 대신) */}
        <div className={`input-group ${errors.id ? "error" : ""}`}>
          <label>아이디<span className="required">*</span></label>
          <input 
            type="text" 
            placeholder="아이디를 입력해주세요"
            value={id}
            onChange={handleIdChange}
          />
          {errors.id && <p className="login-error-text">⚠ 필수 입력 항목입니다.</p>}
        </div>

        {/* 비밀번호 입력 */}
        <div className={`input-group ${errors.password ? "error" : ""}`}>
          <label>비밀번호<span className="required">*</span></label>
          <input 
            type="password" 
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={handlePasswordChange}
          />
          {errors.password && <p className="login-error-text">⚠ 필수 입력 항목입니다.</p>}
        </div>

        {/* 로그인 버튼 */}
        <button type="submit" className="login-button">
          로그인
        </button>
      </form>
    </div>
  );
}

export default Login;
