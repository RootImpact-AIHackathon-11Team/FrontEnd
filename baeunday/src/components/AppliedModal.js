import React from 'react';
import '../css/appliedModal.css';

const AppliedModal = ({ onClose }) => {
  const badgeStyle = {
    display: 'inline-block',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: 'bold',
    width: '40px',
    textAlign: 'center'
  };

  const confirmedStyle = {
    ...badgeStyle,
    background: 'rgba(33, 108, 250, 0.3)',
    color: '#216CFA'
  };

  const pendingStyle = {
    ...badgeStyle,
    background: '#E0E0E0',
    color: '#323E36',
    opacity: '0.5'
  };

  return (
    <div className="applied-modal-overlay" onClick={onClose}>
      <div className="applied-modal-content" onClick={e => e.stopPropagation()}>
        <h2>상태 안내</h2>
        
        <div className="applied-status-info">
          <div className="applied-status-item">
            <span style={confirmedStyle}>참가확정</span>
            <p>신청하신 강의는 강의확정 상태입니다.</p>
            <p>강의 장소, 일시 및 기타 안내사항을 확인하여 강의에 잘 가셔 주시도록 준비해주세요.</p>
            <p className="applied-highlight">*취소 또는 변경이 어려운 단계가 가능하니, 이후에는 강사님께 문의해 주시기 바랍니다.</p>
          </div>

          <div className="applied-status-item">
            <span style={pendingStyle}>결제예정</span>
            <p>입금 전 또는 강사님께서 입금 확인을 하지 않은 상태입니다.</p>
            <p>입금 완료 후 참가확정이 되지 않을 경우 강사님께 문의해주세요.</p>
          </div>
        </div>

        <button className="applied-confirm-btn" onClick={onClose}>확인</button>
      </div>
    </div>
  );
};

export default AppliedModal; 