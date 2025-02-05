
import React from "react";
import "../css/notlogin.css";

function Notlogin({ onSignupClick, onLoginClick }) {  // ✅ 로그인 버튼 핸들러 추가
  return (
    <div className="notlogin-container">
      <header>
        <h1 className="title">
          <span className="highlight">배운데이</span>
          <span className="title-sub">와 함께</span>
        </h1>
        <p className="subtitle">지역에서 어디에서나 강사에 도전해보세요!</p>
        <p className="description">
          AI로 쉽고 빠르게 강의를 기획하고 <br />
          강사 맞춤형 커리큘럼을 세워드려요.
        </p>
      </header>

      <div className="nl-buttons">
        <button className="nl-signup-btn" onClick={onSignupClick}>회원가입</button> 
        <button className="nl-login-btn" onClick={onLoginClick}>로그인</button> {/* ✅ 로그인 버튼 클릭 시 실행 */}
      </div>
    </div>
  );
}

export default Notlogin;
