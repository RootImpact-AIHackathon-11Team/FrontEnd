// InquiryActionSheet.js
import React from 'react';
import '../css/inquiryActionSheet.css';

const InquiryActionSheet = ({ 
  isVisible, 
  onClose, 
  isOwnComment, 
  isOwner,
  onEdit, 
  onDelete, 
  onReply 
}) => {
  if (!isVisible) return null;

  return (
    <div className="action-sheet-overlay" onClick={onClose}>
      <div className="action-sheet" onClick={(e) => e.stopPropagation()}>
        {isOwner ? (
          // 강사인 경우
          isOwnComment ? (
            // 강사 자신의 답변일 경우
            <>
              <button className="action-button" onClick={onEdit}>수정</button>
              <button className="action-button delete" onClick={onDelete}>삭제</button>
            </>
          ) : (
            // 다른 사람의 댓글일 경우
            <button className="action-button reply" onClick={onReply}>답변 등록</button>
          )
        ) : (
          // 일반 사용자인 경우
          isOwnComment && (
            // 자신의 댓글일 경우만
            <>
              <button className="action-button" onClick={onEdit}>수정</button>
              <button className="action-button delete" onClick={onDelete}>삭제</button>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default InquiryActionSheet;
