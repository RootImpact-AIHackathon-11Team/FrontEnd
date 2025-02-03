import '../css/main.css';
import locationIcon from '../assets/images/ping.svg';
import downArrowIcon from '../assets/images/down-arrow.svg';
import searchIcon from '../assets/images/search.svg';
import sortIcon from '../assets/images/sort.svg';
import dropdownIcon from '../assets/images/dropdown.svg';

import mainEx1 from '../assets/examples/mainEx1.png';
import mainEx2 from '../assets/examples/mainEx2.png';
import mainEx3 from '../assets/examples/mainEx3.png';
import mainEx4 from '../assets/examples/mainEx4.png';
import mainEx5 from '../assets/examples/mainEx5.png';

import React, { useState } from 'react';
import RegionSelector from '../components/RegionSelector';  // RegionSelector 추가

const lectures = [
  { title: '"디자인이 제일 쉬웠어요"', location: '구미시 거여동', d_day: 99, price: '무료', status: '모집 중', image: mainEx1 },
  { title: '"꽃... 좋아하세요?"', location: '구미시 사곡동', d_day: 50, price: '25,000원', status: '인원 달성', image: mainEx2 },
  { title: '현직 대기업 개발자가 알려주는 개발자의 미래', location: '구미시 송정동', d_day: 34, price: '무료', status: '모집 중', image: mainEx3 },
  { title: '기획: 전공자가 아니어도 할 수 있습니다.', location: '구미시 산동읍', d_day: 10, price: '무료', status: '모집 중', image: mainEx4 },
  { title: '남녀노소 누구나 따라할 수 있는 홈트레이닝 강의', location: '구미시 원평동', d_day: 7, price: '10,000원', status: '모집 중', image: mainEx5 }
];

const MainPage = () => {
  const [activeCategory, setActiveCategory] = useState('최신순');
  const [showRegionSelector, setShowRegionSelector] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('경북');
  const [selectedCity, setSelectedCity] = useState('구미시');

  const handleCategoryClick = (category) => setActiveCategory(category);

  const handleRegionClick = () => setShowRegionSelector(!showRegionSelector);

  const handleRegionSelect = (regionOrCity) => {
    if (['경북', '서울', '경기'].includes(regionOrCity)) {
      setSelectedRegion(regionOrCity);
    } else {
      setSelectedCity(regionOrCity);
    }
    setShowRegionSelector(false);
  };

  return (
    <div className="main-container">
      <header className="top">
        <div className="header-container">
          <h1 className="baeunday">BAEUNDAY</h1>
          <div className="search-icon">
            <img src={searchIcon} alt="search" />
          </div>
        </div>

        <div className="location-bar">
          <div className="location-item" onClick={handleRegionClick}>
            <img src={locationIcon} alt="location" />
            <span>{selectedRegion}</span>
            <div className="arrow-container">
              <img src={downArrowIcon} alt="arrow" />
            </div>
          </div>
          <div className="divider"></div>
          <div className="location-item second" onClick={handleRegionClick}>
            <span>{selectedCity}</span>
            <div className="arrow-container">
              <img src={downArrowIcon} alt="arrow" />
            </div>
          </div>
        </div>
      </header>

      {showRegionSelector && (
        <RegionSelector onSelect={handleRegionSelect} />
      )}

      <div className="category">
        <button className={`category-btn latest ${activeCategory === '최신순' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('최신순')}>
          <img src={sortIcon} alt="정렬" /> 최신순
        </button>

        <button className={`category-btn filter ${activeCategory === '모집상태' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('모집상태')}>
          모집상태
          <img src={dropdownIcon} alt="드롭다운" />
        </button>

        <button className={`category-btn filter ${activeCategory === '신청금액' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('신청금액')}>
          신청금액
          <img src={dropdownIcon} alt="드롭다운" />
        </button>
      </div>

      <main className="content">
        {lectures.map((lecture, index) => (
          <div className="lecture-card" key={index}>
            <div className="lecture-image">
              <img src={lecture.image} alt={lecture.title} />
            </div>
            <div className="lecture-info">
              <h2>{lecture.title}</h2>
              <div className="lecture-details">
                <p>{lecture.location} · D-{lecture.d_day} · {lecture.price}</p>
                <button className={`status-btn ${lecture.status === '모집 중' ? 'recruiting' : 'filled'}`}>
                  {lecture.status}
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default MainPage;
