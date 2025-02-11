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

import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import RegionSelector from '../components/RegionSelector';
import ActionSheet from '../components/ActionSheet';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';
import { autoLogin, getAuthHeader } from '../utils/auth';

const MainPage = () => {
  const navigate = useNavigate();
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasNext, setHasNext] = useState(true);
  const [nextCursor, setNextCursor] = useState(null);
  
  // 무한 스크롤 관련 ref
  const observerRef = useRef();
  const lastLectureRef = useCallback(node => {
    if (loading) return;
    
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNext) {
        fetchMoreLectures();
      }
    });
    
    if (node) observerRef.current.observe(node);
  }, [loading, hasNext]);

  // 초기 강의 목록 로딩
  const fetchLectures = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://43.202.15.40/posts', {
        headers: getAuthHeader()
      });
      
      const { body, cursor } = response.data.data;
      const lectures = body.postList;
      
      setLectures(lectures);
      setHasNext(cursor.hasNext);
      setNextCursor(cursor.nextId);
    } catch (error) {
      console.error('Error details:', error.response || error);
      setError(error.response?.data?.message || '강의 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 추가 강의 목록 로딩
  const fetchMoreLectures = async () => {
    if (!hasNext || loading) return;
    
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await axios.get(`http://43.202.15.40/posts?cursor=${nextCursor}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      });
      
      const { body, cursor } = response.data.data;
      const lectures = body.postList;
      
      setLectures(prev => [...prev, ...lectures]);
      setHasNext(cursor.hasNext);
      setNextCursor(cursor.nextId);
    } catch (error) {
      console.error('Error details:', error.response || error);
      if (error.response?.status === 403) {
        setError('접근 권한이 없습니다. 로그인이 필요합니다.');
      } else {
        setError('추가 강의 목록을 불러오는데 실패했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  // 자동 로그인 처리
  const handleAutoLogin = async () => {
    const result = await autoLogin();
    if (result.success) {
      fetchLectures();
    } else {
      setError(result.error);
    }
  };

  useEffect(() => {
    handleAutoLogin();
  }, []);

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
        {lectures && lectures.length > 0 ? (
          lectures.map((lecture, index) => (
            <div
              ref={index === lectures.length - 1 ? lastLectureRef : null}
              className="lecture-card"
              key={lecture.postId}
              onClick={() => handleLectureClick(lecture.postId)}
            >
              <div className="lecture-image">
                <img src={lecture.imgURL} alt={lecture.title} />
              </div>
              <div className="lecture-info">
                <h2>{lecture.title}</h2>
                <div className="lecture-details">
                  <p>
                    {lecture.city} · D-{calculateDday(lecture.deadline)} · 
                    <span style={{ color: '#216CFA' }}>
                      {lecture.fee === 0 ? '무료' : `${lecture.fee.toLocaleString()}원`}
                    </span>
                  </p>
                  <button className={`status-btn ${lecture.status === 'AVAILABLE' ? 'recruiting' : 'filled'}`}>
                    {lecture.status === 'AVAILABLE' ? '모집중' : '인원 달성'}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>강의가 없습니다.</div>
        )}
        {loading && <div className="loading">로딩 중...</div>}
        {error && <div className="error">{error}</div>}
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

// D-day 계산 함수
const calculateDday = (deadline) => {
  const today = new Date();
  const dueDate = new Date(deadline);
  const diffTime = dueDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export default MainPage;
