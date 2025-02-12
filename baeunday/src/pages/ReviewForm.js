import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/ReviewForm.css';
import starFilled from '../assets/images/reviewstar.svg';
import starEmpty from '../assets/images/reviewstar_empty.svg';
import backIcon from '../assets/images/Vector.svg';

const ReviewHeader = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="review-form-header">
            <img 
                src={backIcon} 
                alt="back" 
                className="review-form-back-button" 
                onClick={handleBack}
                style={{ cursor: 'pointer' }}
            />
            <h1 className="review-form-header-title">후기 작성</h1>
        </div>
    );
}

const ReviewForm = () => {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState(''); // State for storing review text
    
    const handleRating = (rate) => {
        setRating(rate);
    };

    return (
        <div>
            <ReviewHeader />
            <div className="review-form-container">
                <h2 className="review-form-question">강의는 어땠나요?</h2>
                <p className="review-form-subtext">크리스마스 쿠키 원데이 클래스</p>
                <div className="review-form-stars">
                    {[1, 2, 3, 4, 5].map((index) => (
                        <img
                            key={index}
                            src={index <= rating ? starFilled : starEmpty}
                            alt={index <= rating ? 'Filled Star' : 'Empty Star'}
                            onClick={() => handleRating(index)}
                            className="review-star"
                        />
                    ))}
                </div>
                <div className="review-form-input-container">
                <span className="review-main-text">후기 남기기</span><span className="review-optional-text">(선택)</span>
                </div>
                <input type="text" className="review-form-input" value={reviewText} onChange={(e) => setReviewText(e.target.value)}/>
              <div className="review-form-button-container">
          <button className="review-form-button">
            작성 완료
          </button>
        </div>
            </div>
        </div>
    );
}

export default ReviewForm;
