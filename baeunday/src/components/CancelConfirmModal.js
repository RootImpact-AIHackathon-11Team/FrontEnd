import React from 'react';
import '../css/cancelConfirmModal.css';

const CancelConfirmModal = ({ onClose, onConfirm }) => {
  return (
    <div className="cancel-modal-overlay" onClick={onClose}>
      <div className="cancel-modal-content" onClick={e => e.stopPropagation()}>
        <h2>강의 신청 취소하기</h2>
        <p>&nbsp;취소하면 해당 프로그램을 다시 신청할 수 없게 됩니다.</p>
        <p>정말로 취소하시겠습니까?</p>
        
        <div className="cancel-modal-buttons">
          <button className="cancel-btn" onClick={onClose}>취소</button>
          <button className="confirm-btn" onClick={onConfirm}>강의취소</button>
        </div>
      </div>
    </div>
  );
};

export default CancelConfirmModal; 