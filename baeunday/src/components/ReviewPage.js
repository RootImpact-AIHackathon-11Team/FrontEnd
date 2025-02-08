import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/ReviewPage.css';  // CSS 파일 import
import backIcon from '../assets/images/Vector.svg';
import profileImage from '../assets/examples/mainEx6.png';

const ReviewPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/mypage');
  };

  return (
    <div className="reviewpagereviewContainer">
      {/* 헤더 */}
      <div className="reviewpagereviewHeader">
        <img 
          src={backIcon} 
          alt="뒤로가기" 
          className="reviewpagebackButton"
          onClick={handleBack}
        />
        <h1 className="reviewpageheaderTitle">받은 평가</h1>
      </div>

      {/* 첫 번째 리뷰 아이템 */}
      <div className="reviewpagereviewItem">
        <div className="reviewpagereviewProfile">
          <img src={profileImage} alt="프로필" className="reviewpagereviewerImage" />
          <span className="reviewpagereviewerName">조림정</span>
          <span className="reviewpagereviewDate">2024-06-11</span>
        </div>
        
        {/* 별점 */}
        <div className="reviewpagestarRating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className="reviewpagestar filled">★</span>
          ))}
        </div>

        {/* 리뷰 내용 */}
        <p className="reviewpagereviewText">
          비전공자인 제가 듣기에도 알기 쉽게 설명해주셔서 팁까지는 5점으로 하겠습니다. 근데 이제 사심을 걸물인
        </p>
      </div>

      {/* 두 번째 리뷰 아이템 */}
      <div className="reviewpagereviewItem">
        <div className="reviewpagereviewProfile">
          <img src={profileImage} alt="프로필" className="reviewpagereviewerImage" />
          <span className="reviewpagereviewerName">마음은 어부</span>
          <span className="reviewpagereviewDate">2024-06-11</span>
        </div>
        <div className="reviewpagestarRating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className="reviewpagestar filled">★</span>
          ))}
        </div>
        <p className="reviewpagereviewText">
          제네이 어든, 하나뿐인 아들들이 뭣하는지 알고싶었는데, 이제 이해할수 있겠습니다.
        </p>
      </div>

      {/* 세 번째 리뷰 아이템 */}
      <div className="reviewpagereviewItem">
        <div className="reviewpagereviewProfile">
          <img src={profileImage} alt="프로필" className="reviewpagereviewerImage" />
          <span className="reviewpagereviewerName">Chill Guy</span>
          <span className="reviewpagereviewDate">2024-06-11</span>
        </div>
        <div className="reviewpagestarRating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className="reviewpagestar filled">★</span>
          ))}
        </div>
        <p className="reviewpagereviewText">
          강사님의 지시에 따라 물감을 chill했더니 좋은 작품이 나왔습니다. 별점 chill점 드리고 싶지만 5점이 만점이라 어쩔 수 없네요.
        </p>
      </div>

      {/* 네 번째 리뷰 아이템 */}
      <div className="reviewpagereviewItem">
        <div className="reviewpagereviewProfile">
          <img src={profileImage} alt="프로필" className="reviewpagereviewerImage" />
          <span className="reviewpagereviewerName">마루궁궁마루쭁꾸마루덥썩</span>
          <span className="reviewpagereviewDate">2024-06-10</span>
        </div>
        <div className="reviewpagestarRating">
          {[1, 2].map((star) => (
            <span key={star} className="reviewpagestar filled">★</span>
          ))}
          {[3, 4, 5].map((star) => (
            <span key={star} className="reviewpagestar empty">★</span>
          ))}
        </div>
        <p className="reviewpagereviewText">
        </p>
      </div>
    </div>
  );
};

export default ReviewPage;

