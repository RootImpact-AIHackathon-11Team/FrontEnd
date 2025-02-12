import React from 'react';
import { useNavigate } from 'react-router-dom'; // React Router v6의 useNavigate 훅 import
import '../css/ReviewPage.css'; // CSS 파일 import
import reviewpagebackIcon from '../assets/images/Vector.svg';
import reviewstarIcon from '../assets/images/reviewstar.svg';
import reviewstarEmptyIcon from '../assets/images/reviewstar_empty.svg';
import reviewprofileImage from '../assets/examples/mainEx6.png'; // 경로 수정

const Review = ({ name, field, star, createdDate, courseName, review_id }) => {
  const totalStars = 5;
  const stars = Array.from({ length: totalStars }, (_, index) => (
    <img key={index} src={index < star ? reviewstarIcon : reviewstarEmptyIcon} alt="star" className="reviewpage-star" />
  ));

  return (
    <div className="reviewpage-review">
      <div className="reviewpage-course-name">{courseName}</div>
      <div className="reviewpage-user-info">
        <img src={reviewprofileImage} alt="Profile" className="reviewpage-profile-image" />
        <div className="reviewpage-name">{name}<span className="reviewpage-created-date">{createdDate}</span></div>
      </div>
      <div className="reviewpage-review-content">
        <div className="reviewpage-rating">{stars}</div>
        <p>{field}</p>
      </div>
    </div>
  );
};

function ReviewPage() {
  const navigate = useNavigate(); // useNavigate 훅을 사용

  const reviews = [
    { review_id: 6, name: "조림핑", field: "비전공자인 제가 듣기에도 알기 쉽게 설명해주셔서 평가는 5점으로 하겠습니다. 근데 이제 사심을 곁들인", star: 5, createdDate: "2024-06-11", courseName: "마음이 차분해지는 수채화 교실" },
    { review_id: 5, name: "마음은 어부", field: "내 나이 여든. 하나뿐인 아들놈이 뭣하는지 알고 싶었는대. 이제 이해할 수 있을 것 같습니다.", star: 5, createdDate: "2024-06-11", courseName: "마음이 차분해지는 수채화 교실" },
    { review_id: 4, name: "Chill Guy", field: "강사님의 지시에 따라 물감을 chill했더니 좋은 작품이 나왔습니다. 별점 chill점 드리고 싶지만 5점이 만점이라 어쩔 수 없네요.", star: 5, createdDate: "2024-06-11", courseName: "마음이 차분해지는 수채화 교실" },
    { review_id: 3, name: "마루킁킁마루쫑긋마루덥썩", field: "", star: 2, createdDate: "2024-06-10", courseName: "이것만 알면 나도 강아지가 될 수 있다." }
  ];

  return (
    <div>
      <div className="review-page-header">
        <button className="review-page-back-button" onClick={() => navigate('/mypage')}>
          <img src={reviewpagebackIcon} alt="Back" />
        </button>
        <div className="review-page-title">받은 평가</div>
      </div>

      <div className="reviewpage">
        {reviews.map((review) => (
          <Review key={review.review_id} {...review} />
        ))}
      </div>
    </div>
  );
}

export default ReviewPage;
