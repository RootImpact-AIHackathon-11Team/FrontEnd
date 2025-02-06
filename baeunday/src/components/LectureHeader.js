import React from 'react';
import { useNavigate } from 'react-router-dom';
import backIcon from "../assets/images/left-arrow.svg";
import tripleIcon from "../assets/images/triple-bar.svg";
import '../css/headerComponent.css'; // 추가


const LectureHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="lecture-detail-header">
      <div className="lecture-header-left">
        <button onClick={() => navigate(-1)} className="lecture-back-button">
          <img src={backIcon} alt="뒤로가기" className="back-icon" />
        </button>
      </div>
      <div className="lecture-header-right">
        <button className="lecture-menu-button">
          <img src={tripleIcon} alt="메뉴" />
        </button>
      </div>
    </header>
  );
};

export default LectureHeader;