import React from 'react';
import '../css/inquiryHeader.css';
import backIcon from "../assets/images/left-arrow.svg";
import { useNavigate } from 'react-router-dom';

const InquiryHeader = ({ title = "문의" }) => {
  const navigate = useNavigate();

  return (
    <div className="inquiry-header">
      <div className="lecture-header-left">
      <button onClick={() => navigate(-1)} className="inquiry-back-button">
  <img src={backIcon} alt="뒤로가기" className="back-icon" />
</button>

      </div>
      <div className="lecture-header-right">
        <h1 className="inquiry-header-title">{title}</h1>
      </div>
    </div>
  );
};

export default InquiryHeader;
