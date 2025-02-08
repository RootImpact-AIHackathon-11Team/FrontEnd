import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backIcon from "../assets/images/left-arrow.svg";
import tripleIcon from "../assets/images/triple-bar.svg";
import jjimIcon from "../assets/images/jjim.svg";
import '../css/headerComponent.css';

const LectureHeader = ({ isInstructor }) => {
  const navigate = useNavigate();
  const [showActions, setShowActions] = useState(false);

  const handleMenuClick = () => {
    setShowActions(true);
  };

  const handleActionSelect = (action) => {
    switch (action) {
      case '수정':
        console.log('수정하기');
        break;
      case '삭제':
        console.log('삭제하기');
        break;
      default:
        break;
    }
    setShowActions(false);
  };

  const handleJjimClick = () => {
    console.log('찜하기');
    // 여기에 찜하기 로직 추가
  };

  return (
    <>
      <header className="lecture-detail-header">
        <div className="lecture-header-left">
          <button onClick={() => navigate(-1)} className="lecture-back-button">
            <img src={backIcon} alt="뒤로가기" className="back-icon" />
          </button>
        </div>
        <div className="lecture-header-right">
          {isInstructor ? (
            <button className="lecture-menu-button" onClick={handleMenuClick}>
              <img src={tripleIcon} alt="메뉴" id="lecture-menu-icon" />
            </button>
          ) : (
            <button className="lecture-menu-button" onClick={handleJjimClick}>
              <img src={jjimIcon} alt="찜하기" id="lecture-jjim-icon" />
            </button>
          )}
        </div>
      </header>

      {showActions && isInstructor && (
        <div className="action-sheet-overlay" onClick={() => setShowActions(false)}>
          <div className="action-sheet" onClick={e => e.stopPropagation()}>
            <button 
              className="action-button"
              onClick={() => handleActionSelect('수정')}
            >
              수정
            </button>
            <button 
              className="action-button delete"
              onClick={() => handleActionSelect('삭제')}
            >
              삭제
            </button>
          </div>
        </div>
      )}

      {!isInstructor && (
        <div className="apply-button-container">
          <button className="apply-button">
            신청하기
          </button>
        </div>
      )}
    </>
  );
};

export default LectureHeader;