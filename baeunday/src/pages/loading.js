import React from "react";
import "../css/loading.css"; // CSS 파일 불러오기
import logo from "../assets/images/로고.svg"; // ✅ SVG 로고 이미지 불러오기

function Loading() {
  return (
    <div className="loading-container">
      <img src={logo} alt="배운데이 로고" className="loading-logo" />
    </div>
  );
}

export default Loading;
