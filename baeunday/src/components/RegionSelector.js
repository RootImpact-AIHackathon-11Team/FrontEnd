import React from 'react';
import '../css/regionSelector.css';

const regions = ['서울', '경기', '인천', '강원', '충남', '대전', '충북', '세종', '부산', '울산', '대구', '경북', '경남', '전남', '광주', '전북', '제주', '전국'];
const cities = ['구미시', '포항시', '안동시', '김천시'];

const RegionSelector = ({ onSelect }) => {
  return (
    <div className="region-selector">
      <div className="region-list">
        {regions.map((region) => (
          <button key={region} onClick={() => onSelect(region)}>
            {region}
          </button>
        ))}
      </div>
      <div className="city-list">
        {cities.map((city) => (
          <button key={city} onClick={() => onSelect(city)}>
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RegionSelector;
