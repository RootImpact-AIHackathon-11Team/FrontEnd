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
import RegionSelector from '../components/RegionSelector';
import ActionSheet from '../components/ActionSheet';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';



const lectures = [
  { id: 1, title: '"디자인이 제일 쉬웠어요" - 하루만에 배우는 디자인 철학', location: '구미시 거여동', d_day: 99, price: '무료', status: '모집 중', image: mainEx1 },
  { id: 2, title: '"꽃... 좋아하세요?"', location: '구미시 사곡동', d_day: 50, price: '25,000원', status: '인원 달성', image: mainEx2 },
  { id: 3, title: '현직 대기업 개발자가 알려주는 개발자의 미래', location: '구미시 송정동', d_day: 34, price: '무료', status: '모집 중', image: mainEx3 },
  { id: 4, title: '기획: 전공자가 아니어도 할 수 있습니다.', location: '구미시 산동읍', d_day: 10, price: '무료', status: '모집 중', image: mainEx4 },
  { id: 5, title: '남녀노소 누구나 따라할 수 있는 홈트레이닝 강의', location: '구미시 원평동', d_day: 7, price: '10,000원', status: '모집 중', image: mainEx5 }
];


const MainPage = () => {
  const navigate = useNavigate();

  const handleLectureClick = (lectureId) => {
    navigate(`/lecture/${lectureId}`);
  };


  const [activeCategory, setActiveCategory] = useState('최신순');
  const [selectorMode, setSelectorMode] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState('경북');
  const [selectedCity, setSelectedCity] = useState('구미시');

  const [isSheetOpen, setSheetOpen] = useState(false);
  const [sheetOptions, setSheetOptions] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    최신순: '최신순',
    모집상태: '모집상태',
    신청금액: '신청금액'
  });

  const options = {
    최신순: ['최신순', '마감순', '찜 많은 순'],
    모집상태: ['전체 상태', '모집 중', '인원 달성', '종료'],
    신청금액: ['전체 금액', '무료', '3만원 이하', '3~5만원', '10만원 이상']
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setSheetOptions(
      options[category].map((option) => ({
        label: option,
        value: option,
        selected: selectedFilters[category] === option
      }))
    );
    setSheetOpen(true);
  };

  const handleSelect = (value, label) => {
    setSelectedFilters((prev) => ({ ...prev, [activeCategory]: label }));
    if (activeCategory === '최신순') {
      setActiveCategory(label);
    }
    setSheetOpen(false);
  };

  const toggleSelector = (mode) => {
    setSelectorMode(selectorMode === mode ? null : mode);
  };

  const handleSelectRegion = (region) => {
    setSelectedRegion(region);
    setSelectedCity('');
    setSelectorMode('city');
  };

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    setSelectorMode(null);
  };

  return (
    <div className="main-container">
      <header className={`top ${selectorMode ? 'selector-open' : ''}`}>
        <div className="header-container">
          <h1 className="baeunday">BAEUNDAY</h1>
          <div className="search-icon">
            <img src={searchIcon} alt="search" />
          </div>
        </div>

        <div className={`location-bar ${selectorMode ? 'selector-open' : ''}`}>
          <div className="location-item" onClick={() => toggleSelector('region')}>
            <img src={locationIcon} alt="location" />
            <span>{selectedRegion}</span>
            <div className="arrow-container">
              <img 
                src={downArrowIcon} 
                alt="arrow" 
                style={{ 
                  transform: selectorMode === 'region' ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.3s ease'
                }}
              />
            </div>
          </div>
          <div className="main-divider"></div>
          <div className="location-item second" onClick={() => toggleSelector('city')}>
            <span>{selectedCity || '세부 지역 선택'}</span>
            <div className="arrow-container">
              <img 
                src={downArrowIcon} 
                alt="arrow"
                style={{ 
                  transform: selectorMode === 'city' ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.3s ease'
                }}
              />
            </div>
          </div>
          
          {selectorMode && (
            <RegionSelector
              mode={selectorMode}
              selectedRegion={selectedRegion}
              onSelectRegion={handleSelectRegion}
              onSelectCity={handleSelectCity}
              className="open"
            />
          )}
        </div>
      </header>

      <div className={`category ${selectorMode ? 'selector-open' : ''}`}>
        <button className={`category-btn latest ${activeCategory === '최신순' ? 'active' : ''}`} onClick={() => handleCategoryClick('최신순')}>
          <img src={sortIcon} alt="정렬" /> {selectedFilters['최신순']}
        </button>

        <button className={`category-btn filter ${activeCategory === '모집상태' ? 'active' : ''}`} onClick={() => handleCategoryClick('모집상태')}>
          {selectedFilters['모집상태']}
          <img src={dropdownIcon} alt="드롭다운" />
        </button>

        <button className={`category-btn filter ${activeCategory === '신청금액' ? 'active' : ''}`} onClick={() => handleCategoryClick('신청금액')}>
          {selectedFilters['신청금액']}
          <img src={dropdownIcon} alt="드롭다운" />
        </button>
      </div>

      <main className="content">
      {lectures.map((lecture) => (
        <div
          className="lecture-card"
          key={lecture.id}
          onClick={() => handleLectureClick(lecture.id)}
          style={{ cursor: 'pointer' }}
        >
          <div className="lecture-image">
            <img src={lecture.image} alt={lecture.title} />
          </div>
          <div className="lecture-info">
            <h2>{lecture.title}</h2>
            <div className="lecture-details">
              <p>
                {lecture.location} · D-{lecture.d_day} · <span style={{ color: '#216CFA' }}>{lecture.price}</span>
              </p>
              <button className={`status-btn ${lecture.status === '모집 중' ? 'recruiting' : 'filled'}`}>
                {lecture.status}
              </button>
            </div>
          </div>
        </div>
      ))}
    </main>

      {isSheetOpen && (
        <ActionSheet
        options={sheetOptions}
        onSelect={handleSelect}
        onClose={() => setSheetOpen(false)}
        />
      )}
      <BottomNavigation />
    </div>
  );
};

export default MainPage;
