// ActionSheet.js
import React from 'react';
import '../css/actionSheet.css';
import checkIcon from '../assets/images/check.svg';

const ActionSheet = ({ options, onSelect, onClose }) => {
  return (
    <div className="action-sheet-overlay" onClick={onClose}>
      <div className="action-sheet" onClick={(e) => e.stopPropagation()}>
        {options.map((option, index) => (
          <div
            key={index}
            className={`action-sheet-option ${option.selected ? 'selected' : ''}`}
            onClick={() => {
              onSelect(option.value, option.label);
              onClose();
            }}
          >
            <span className="option-label">{option.label}</span>
            {option.selected && <img className="check-icon" src={checkIcon} alt="check" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionSheet;