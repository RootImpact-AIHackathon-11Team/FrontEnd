import React from 'react';
import '../css/appliedHeader.css';
import searchBlackIcon from '../assets/images/search-black.svg';

const AppliedHeader = ({ title = "신청한" }) => {
  return (
    <div className="applied-header">
      <div className="applied-header-content">
        <h1 className="applied-header-title">{title}</h1>
        <div className="applied-header-right">
          <img 
            src={searchBlackIcon} 
            alt="검색" 
            className="search-black-icon"
            style={{ display: 'block' }}
          />
        </div>
      </div>
    </div>
  );
};

export default AppliedHeader;
