import React from 'react';
import '../css/InfoModal.css'; // 스타일 시트 불러오기

const InfoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modalBackdrop">
      <div className="modalContent">
        <h2 className="modalHeader">매너발자국이란?</h2>
        <p className="modalBody">매너발자국은 수강생으로부터 받은 별점을 종합하여 만든 매너 지표입니다.</p>
        <p className="modalBody">첫 매너발자국은 1000보에서 시작해요!</p>
        <button onClick={onClose} className="modalCloseButton">확인</button>
      </div>
    </div>
  );
};

export default InfoModal;
