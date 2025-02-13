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

const MainPage = () => {
  const API_BASE_URL = window.location.hostname.includes('ngrok') 
    ? 'https://edd9-2001-2d8-74ca-b3b1-9d4d-a8f-1e0f-ee66.ngrok-free.app' 
    : 'http://43.202.15.40/api';
  
  const navigate = useNavigate();
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasNext, setHasNext] = useState(true);
  const [nextCursor, setNextCursor] = useState(null);
  const [nextId, setNextId] = useState(null);
  
  // 필터 매핑 객체들
  const statusMapping = {
    '전체 상태': null,
    '모집 중': 'AVAILABLE',
    '인원 달성': 'ING',
    '종료': 'END'
  };

  const feeMapping = {
    '전체 금액': null,
    '무료': 'FREE',
    '3만원 이하': 'UNDER_3',
    '3~5만원': 'BETWEEN3_5',
    '5~10만원': 'BETWEEN5_10',
    '10만원 이상': 'OVER_10'
  };

  const sortMapping = {
    '최신순': 'recent',
    '마감순': 'deadline',
    '찜 많은 순': 'heart'
  };

  const [activeCategory, setActiveCategory] = useState('최신순');
  const [selectorMode, setSelectorMode] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState('전국');
  const [selectedCity, setSelectedCity] = useState('전체');
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [sheetOptions, setSheetOptions] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    최신순: '최신순',
    모집상태: '모집상태',
    신청금액: '신청금액'
  });

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

  // Axios 인터셉터 설정
  useEffect(() => {
    // Request 인터셉터
    axios.interceptors.request.use(
      (config) => {
        console.log('🚀 Request:', {
          method: config.method?.toUpperCase(),
          url: config.url,
          headers: config.headers,
          params: config.params,
          data: config.data
        });
        return config;
      },
      (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response 인터셉터
    axios.interceptors.response.use(
      (response) => {
        console.log('✅ Response:', {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          data: response.data
        });
        return response;
      },
      (error) => {
        console.error('❌ Response Error:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          headers: error.response?.headers,
          data: error.response?.data,
          error: error.message
        });
        return Promise.reject(error);
      }
    );
  }, []);

  // 초기 강의 목록 로딩
  const fetchLectures = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('로그인이 필요합니다.');
        navigate('/login');
        return;
      }

      const sort = sortMapping[selectedFilters['최신순']] || 'recent';
      const params = new URLSearchParams();
      params.append('sort', sort);

      const status = statusMapping[selectedFilters['모집상태']];
      const feeRange = feeMapping[selectedFilters['신청금액']];
      
      if (status && status !== 'ALL') {
        params.append('status', status);
      }
      if (feeRange && feeRange !== 'ALL') {
        params.append('feeRange', feeRange);
      }

      if (selectedRegion !== '전국') {
        params.append('province', selectedRegion);
      }
      if (selectedCity !== '전체') {
        params.append('city', selectedCity);
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': '*/*'
        }
      };

      console.log('Request Details:', {
        url: `${API_BASE_URL}/posts?${params.toString()}`,
        headers: config.headers,
        token: token
      });

      const response = await axios.get(`${API_BASE_URL}/posts?${params.toString()}`, config);
      
      if (response.data && response.data.data) {
        const { body, cursor } = response.data.data;
        if (body && body.postList) {
          setLectures(body.postList);
          setHasNext(cursor.hasNext);
          setNextCursor(cursor.nextCursor);
          setNextId(cursor.nextId);
        } else {
          setLectures([]);
        }
      }
    } catch (error) {
      console.error('API 요청 에러:', error);
      console.error('요청 헤더:', error.config?.headers);  // 에러 발생 시 헤더 정보도 출력
      if (error.response?.status === 403) {
        localStorage.removeItem('token');
        setError('접근 권한이 없습니다.');
        navigate('/login');
      } else {
        setError('강의 목록을 불러오는데 실패했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  // 추가 강의 목록 로딩 (페이지네이션)
  const fetchMoreLectures = async () => {
    if (!hasNext || loading) return;
    
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('로그인이 필요합니다.');
        navigate('/login');
        return;
      }

      const sort = sortMapping[selectedFilters['최신순']] || 'recent';
      const params = new URLSearchParams();
      params.append('sort', sort);
      
      if (nextCursor) {
        params.append('cursor', nextCursor);
        params.append('cursorId', String(nextId));
      }

      const status = statusMapping[selectedFilters['모집상태']];
      const feeRange = feeMapping[selectedFilters['신청금액']];
      
      if (status && status !== 'ALL') {
        params.append('status', status);
      }
      if (feeRange && feeRange !== 'ALL') {
        params.append('feeRange', feeRange);
      }
      if (selectedRegion !== '전국') {
        params.append('province', selectedRegion);
      }
      if (selectedCity !== '전체') {
        params.append('city', selectedCity);
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': '*/*'
        }
      };

      console.log('Pagination Request Details:', {
        url: `${API_BASE_URL}/posts?${params.toString()}`,
        headers: config.headers,
        token: token,
        cursor: nextCursor,
        cursorId: nextId
      });

      const response = await axios.get(`${API_BASE_URL}/posts?${params.toString()}`, config);

      if (response.data?.data) {
        const { cursor, body } = response.data.data;
        if (body?.postList) {
          setLectures(prev => [...prev, ...body.postList]);
          setHasNext(cursor.hasNext);
          setNextCursor(cursor.nextCursor);
          setNextId(cursor.nextId);
        }
      }
    } catch (error) {
      console.error('페이지네이션 에러:', error);
      console.error('요청 헤더:', error.config?.headers);
      if (error.response?.status === 403) {
        localStorage.removeItem('token');
        setError('접근 권한이 없습니다.');
        navigate('/login');
      } else {
        setError('추가 강의 목록을 불러오는데 실패했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 컴포넌트 마운트 시와 필터(정렬, 모집상태, 금액) + 지역/도시 변경 시 새 데이터 fetch
    setLectures([]);
    setNextCursor(null);
    setNextId(null);
    setHasNext(true);
    fetchLectures();
  }, [
    selectedFilters['최신순'],
    selectedFilters['모집상태'],
    selectedFilters['신청금액'],
    selectedRegion,          // <-- 추가
    selectedCity             // <-- 추가
  ]);

  const handleLectureClick = (lectureId) => {
    navigate(`/lecture/${lectureId}`);
  };

  const options = {
    최신순: ['최신순', '마감순', '찜 많은 순'],
    모집상태: ['전체 상태', '모집 중', '인원 달성', '종료'],
    신청금액: ['전체 금액', '무료', '3만원 이하', '3~5만원', '5~10만원', '10만원 이상']
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
      // 정렬 옵션이 변경될 때마다 상태 초기화
      setLectures([]); // 기존 데이터 초기화
      setNextCursor(null); // cursor 초기화
      setNextId(null); // cursorId 초기화
      setHasNext(true); // hasNext 초기화
    }
    setSheetOpen(false);
  };

  const toggleSelector = (mode) => {
    setSelectorMode(selectorMode === mode ? null : mode);
  };

  const handleSelectRegion = (region) => {
    setSelectedRegion(region);
    setSelectedCity('전체');
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
                  {lecture.province} {lecture.city} · {calculateDday(lecture.deadline)} · 
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

  if (diffDays >= 0) {
    // 마감일이 아직 남아있다면 D-값
    return `D-${diffDays}`;
  } else {
    // 이미 마감일이 지났다면 D+값
    return `D+${Math.abs(diffDays)}`;
  }
};

export default MainPage;
