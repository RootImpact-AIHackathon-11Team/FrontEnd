import React, { useState } from "react";
import "../css/login.css"; // CSS 파일 불러오기
import backIcon from "../assets/images/Vector.svg"; // 뒤로가기 아이콘 불러오기
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const API_BASE_URL = 'https://mannajang.store';
  // ✅ 필수 입력값 검증 상태
  const [errors, setErrors] = useState({
    username: false,
    password: false,
  });

  // ✅ 입력 시 필수 입력값 에러 해제
  const handleInputChange = (field, value) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: !value.trim(),
    }));
  };

  // ✅ 아이디 입력
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    handleInputChange("username", e.target.value);
  };

  // ✅ 비밀번호 입력
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    handleInputChange("password", e.target.value);
  };

  // ✅ 로그인 처리
  const handleLogin = async (e) => {
    e.preventDefault();
    
    // 입력값 검증
    let newErrors = {
      username: !username,
      password: !password,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    try {
      const requestBody = {
        username: username,
        password: password
      };
      
      console.log('로그인 요청:', requestBody);

      const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('로그인 응답 상태:', response.status);
      
      if (response.ok) {
        // JWT 토큰 추출 (Authorization 헤더에서)
        const token = response.headers.get('Authorization');
        if (token) {
          // Bearer 제거하고 토큰만 저장
          const jwtToken = token.replace('Bearer ', '');
          // localStorage에 토큰 저장
          localStorage.setItem('token', jwtToken);
          console.log('JWT 토큰 저장됨');
        }

        const data = await response.json();
        console.log('로그인 응답 데이터:', data);

        alert(data.message || "로그인 성공");
        navigate('/mainpage');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "로그인 실패");
      }
    } catch (error) {
      console.error('로그인 중 오류:', error);
      alert(error.message || "로그인 처리 중 오류가 발생했습니다.");
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
        {/* 아이디 입력 */}
        <div className={`input-group ${errors.username ? "error" : ""}`}>
          <label>아이디<span className="required">*</span></label>
          <input 
            type="text" 
            placeholder="아이디를 입력해주세요"
            value={username}
            onChange={handleUsernameChange}
          />
          {errors.username && <p className="login-error-text">⚠ 필수 입력 항목입니다.</p>}
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
