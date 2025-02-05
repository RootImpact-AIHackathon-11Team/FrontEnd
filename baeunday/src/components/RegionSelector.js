import React, { useState } from 'react';
import '../css/regionSelector.css';

const regionData = {
  '서울': ['전체', '종로구', '중구', '용산구', '성동구', '광진구', '동대문구', '중랑구', '성북구', '강북구', '도봉구', '노원구', '은평구', '서대문구', '마포구', '양천구', '강서구', '구로구', '금천구', '영등포구', '동작구', '관악구', '서초구', '강남구', '송파구', '강동구'],
  '경기': ['전체', '수원시', '성남시', '고양시', '용인시', '부천시', '안산시', '안양시', '평택시', '의정부시', '파주시', '김포시', '광명시', '하남시', '오산시', '군포시', '의왕시', '이천시', '안성시', '김포시', '시흥시'],
  '인천': ['전체', '중구', '동구', '미추홀구', '연수구', '남동구', '부평구', '계양구', '서구', '강화군', '옹진군'],
  '강원': ['전체', '춘천시', '원주시', '강릉시', '동해시', '태백시', '속초시', '삼척시', '홍천군', '횡성군', '영월군', '평창군', '정선군', '철원군', '화천군', '양구군', '인제군', '고성군', '양양군'],
  '충남': ['전체', '천안시', '공주시', '보령시', '아산시', '서산시', '논산시', '계룡시', '당진시', '금산군', '부여군', '서천군', '청양군', '홍성군', '예산군', '태안군'],
  '대전': ['전체', '동구', '중구', '서구', '유성구', '대덕구'],
  '충북': ['전체', '청주시', '충주시', '제천시', '보은군', '옥천군', '영동군', '진천군', '괴산군', '음성군', '단양군'],
  '세종': ['세종시'],
  '부산': ['전체', '중구', '서구', '동구', '영도구', '부산진구', '동래구', '남구', '북구', '해운대구', '사하구', '금정구', '강서구', '연제구', '수영구', '사상구', '기장군'],
  '울산': ['전체', '중구', '남구', '동구', '북구', '울주군'],
  '대구': ['전체', '중구', '동구', '서구', '남구', '북구', '수성구', '달서구', '달성군'],
  '경북': ['전체', '포항시', '경주시', '김천시', '안동시', '구미시', '영주시', '영천시', '상주시', '문경시', '경산시', '의성군', '청송군', '영양군', '영덕군', '청도군', '고령군', '성주군', '칠곡군', '예천군', '봉화군', '울진군', '울릉군'],
  '경남': ['전체', '창원시', '진주시', '통영시', '사천시', '김해시', '밀양시', '거제시', '양산시', '의령군', '함안군', '창녕군', '고성군', '남해군', '하동군', '산청군', '함양군', '거창군', '합천군'],
  '전남': ['전체', '목포시', '여수시', '순천시', '나주시', '광양시', '담양군', '곡성군', '구례군', '고흥군', '보성군', '화순군', '장흥군', '강진군', '해남군', '영암군', '무안군', '함평군', '영광군', '장성군', '완도군', '진도군', '신안군'],
  '광주': ['전체', '동구', '서구', '남구', '북구', '광산구'],
  '전북': ['전체', '전주시', '군산시', '익산시', '정읍시', '남원시', '김제시', '완주군', '진안군', '무주군', '장수군', '임실군', '순창군', '고창군', '부안군'],
  '제주': ['전체', '제주시', '서귀포시'],
  '전국': ['전체']
};

const RegionSelector = ({ mode, selectedRegion, onSelectRegion, onSelectCity, className }) => {
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태 추가

  const handleScroll = (event) => {
    const scrollLeft = event.target.scrollLeft;
    const pageWidth = event.target.clientWidth;
    const pageIndex = Math.round(scrollLeft / pageWidth); // 현재 페이지 계산
    setCurrentPage(pageIndex);
  };

  const pages = selectedRegion ? Math.ceil(regionData[selectedRegion].length / 8) : 0;

  return (
    <div className={`region-selector ${className ? className : ''}`}>
      {mode === 'region' && (
        <div className="region-grid">
          {Object.keys(regionData).map((region) => (
            <button
              key={region}
              className={`region-button ${region === selectedRegion ? 'active' : ''}`}
              onClick={() => onSelectRegion(region)}
            >
              {region}
            </button>
          ))}
        </div>
      )}

      {mode === 'city' && selectedRegion && regionData[selectedRegion]?.length > 0 && (
        <div className="city-slider" onScroll={handleScroll}>
          {Array.from({ length: pages }).map((_, pageIndex) => (
            <div className="city-page" key={pageIndex}>
              {regionData[selectedRegion]
                .slice(pageIndex * 8, (pageIndex + 1) * 8)
                .map((city) => (
                  <button key={city} onClick={() => onSelectCity(city)}>
                    {city}
                  </button>
                ))}
            </div>
          ))}
        </div>
      )}

      {/* 페이지네이션 도트 추가 */}
      {mode === 'city' && pages > 1 && (
        <div className="pagination-dots">
          {Array.from({ length: pages }).map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentPage ? 'active' : ''}`}
            ></span>
          ))}
        </div>
      )}
    </div>
  );
};

export default RegionSelector;