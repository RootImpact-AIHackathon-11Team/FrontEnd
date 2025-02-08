import React from 'react';
import '../css/appliedHeader.css';
import { useNavigate } from 'react-router-dom';

const InquiryHeader = ({ title = "신청한" }) => {

  return (
    <div className="applied-header">

      <div className="applied-header-left">
        <h1 className="applied-header-title">{title}</h1>
      </div>
    </div>
  );
};

export default InquiryHeader;
