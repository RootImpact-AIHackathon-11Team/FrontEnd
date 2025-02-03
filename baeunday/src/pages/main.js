
import '../css/main.css';
import locationIcon from '../assets/images/ping.svg';
import downArrowIcon from '../assets/images/down-arrow.svg';
import searchIcon from '../assets/images/search.svg';

import React, { useState } from 'react';
import sortIcon from '../assets/images/sort.svg';        // 최신순 아이콘
import dropdownIcon from '../assets/images/dropdown.svg'; // 드롭다운 화살표 아이콘



const MainPage = () => {
  const [activeCategory, setActiveCategory] = useState('최신순');

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };
  return (
    <div className="main-container">
      <header className="top">
        <div className="header-container">  {/* 추가된 div */}
          <h1 className="baeunday">BAEUNDAY</h1>
          <div className="search-icon">
            <img src={searchIcon} alt="search" />
          </div>
        </div>

        <div className="location-bar">
          <div className="location-item">
            <img src={locationIcon} alt="location" />
            <span>경북</span>
            <div className="arrow-container">
              <img src={downArrowIcon} alt="arrow" />
            </div>
          </div>
          <div className="divider"></div>
          <div className="location-item second">
            <span>구미시</span>
            <div className="arrow-container">
              <img src={downArrowIcon} alt="arrow" />
            </div>
          </div>
        </div>


      </header>


      <div className="category">
      {/* 최신순 버튼 */}
      <button
        className={`category-btn latest ${activeCategory === '최신순' ? 'active' : ''}`}
        onClick={() => handleCategoryClick('최신순')}
      >
        <img src={sortIcon} alt="정렬" />
        최신순
      </button>

      {/* 모집상태 버튼 */}
      <button
        className={`category-btn filter ${activeCategory === '모집상태' ? 'active' : ''}`}
        onClick={() => handleCategoryClick('모집상태')}
      >
        모집상태
        <img src={dropdownIcon} alt="드롭다운" />
      </button>

      {/* 신청금액 버튼 */}
      <button
        className={`category-btn filter ${activeCategory === '신청금액' ? 'active' : ''}`}
        onClick={() => handleCategoryClick('신청금액')}
      >
        신청금액
        <img src={dropdownIcon} alt="드롭다운" />
      </button>
    </div>

      <main className="content">
        <div className="lecture-card">
          <div className="lecture-type">디자인 강의</div>
          <div className="lecture-info">
            <h2>"디자인이 제일 쉬웠어요" - 하루만에 배우는 디자인 철학</h2>
            <p>구미시 거여동 · D-99 · 무료</p>
            <button className="status-btn recruiting">모집 중</button>
          </div>
        </div>

        <div className="lecture-card">
          <div className="lecture-type">꽃꽂이 강의</div>
          <div className="lecture-info">
            <h2>"꽃... 좋아하세요?" 꽃처럼 아름다운 사장이 알려주는 꽃꽂이</h2>
            <p>구미시 사곡동 · D-50 · 25,000원</p>
            <button className="status-btn filled">인원 달성</button>
          </div>
        </div>

        <div className="lecture-card">
          <div className="lecture-type">코딩 강의</div>
          <div className="lecture-info">
            <h2>현직 대기업 개발자가 알려주는 개발자의 미래</h2>
            <p>구미시 송정동 · D-34 · 무료</p>
            <button className="status-btn recruiting">모집 중</button>
          </div>
        </div>
      </main>

      <nav className="bottom-nav">
        <button className="nav-btn active">
          <img src="/icons/home.svg" alt="홈" />
          <span>홈</span>
        </button>
        <button className="nav-btn">
          <img src="/icons/list.svg" alt="신청한 강의" />
          <span>신청한 강의</span>
        </button>
        <button className="nav-btn">
          <img src="/icons/plus.svg" alt="추가" className="plus-btn" />
        </button>
        <button className="nav-btn">
          <img src="/icons/heart.svg" alt="찜" />
          <span>찜</span>
        </button>
        <button className="nav-btn">
          <img src="/icons/user.svg" alt="내 정보" />
          <span>내 정보</span>
        </button>
      </nav>
    </div>
  );
};

export default MainPage;