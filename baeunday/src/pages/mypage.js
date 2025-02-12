import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import InfoModal from '../components/InfoModal';
import ReviewPage from '../components/ReviewPage'; // 리뷰 페이지 컴포넌트 추가
import '../css/mypage.css';
import mainEx6 from '../assets/examples/mainEx6.png';
import paperIcon from '../assets/images/paper.svg';
import starIcon from '../assets/images/star.svg';
import vectorIcon from '../assets/images/Vector2.svg';
import questionIcon from '../assets/images/question.svg';

export default function MyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);  // 모달 상태 관리
  const navigate = useNavigate(); // useNavigate 훅 사용

  // 모달 열기
  const handleOpenModal = () => setIsModalOpen(true);
  // 모달 닫기
  const handleCloseModal = () => setIsModalOpen(false);
  // 프로필 편집 페이지로 이동
  const handleProfileEdit = () => navigate('/profile/edit');
  // 받은 평가 페이지로 이동
  const handleReviewPage = () => navigate('/mypage/review');  // 이 부분이 새로 추가됨

  return (
    <div className="p-container">
      <h1 className="p-header">내 정보</h1>
      
      <div className="p-profileCard">
        <div className="p-profileInfo">
          <img src={mainEx6} alt="프로필" className="p-profileImage" />
          <div>
            <h2 className="p-profileName">컴공 사이에 피어난 전쟁통</h2>
            <p className="p-profileDesc">나로 말할 것 같으면~ 자신감있는 강사~</p>
          </div>
          <img src={vectorIcon} alt="화살표" className="p-arrow" id='p-arrow1' onClick={handleProfileEdit} />
        </div>

        <div className="p-temperatureSection">
          <div className="p-temperatureLabel">
            <div className="p-temperatureLeft">
              <span className="p-temperatureText">매너발자국</span>
              <img src={questionIcon} alt="도움말" className="p-questionIcon" onClick={handleOpenModal} />
            </div>
            <span className="p-temperatureValue">1000보</span>
          </div>
          <div className="p-progressBar">
            <div className="p-progressFill" />
          </div>
        </div>
      </div>

      <div className="p-menuCard">
        <div className="p-menuContent">
          <img src={paperIcon} alt="강의" className="p-menuIcon" />
          <div className="p-menuTextContainer">
            <div className="p-menuTitle" id='p-menuTitle1'>등록한 강의</div>
            <div className="p-menuDesc">'배운데이'와 함께 작성한 강의 기획서들을 살펴볼 수 있어요</div>
          </div>
          <img src={vectorIcon} alt="화살표" className="p-arrow" id='p-arrow2' onClick={handleReviewPage} />
        </div>
      </div>

      <div className="p-menuCard">
        <div className="p-menuContent">
          <img src={starIcon} alt="별점" className="p-menuIcon" />
          <div className="p-menuTextContainer">
            <div className="p-menuTitle" id='p-menuTitle2'>받은 평가</div>
            <div className="p-reviewList">
              <div className="p-reviewItem">
                <img src={mainEx6} alt="프로필" className="p-reviewerImage" />
                <div className="p-reviewContent">
                  <div className="p-reviewerName">조림핑</div>
                  <div className="p-reviewText">비전공자인 제가 듣기에도 알기 쉽게 설명해주셔서 평가는 5점으로 하겠습니다. 근데 이제 사심을 곁들인</div>
                </div>
              </div>
              <div className="p-reviewItem">
                <img src={mainEx6} alt="프로필" className="p-reviewerImage" />
                <div className="p-reviewContent">
                  <div className="p-reviewerName">마음은 어부</div>
                  <div className="p-reviewText">제나이 여든. 하나뿐인 아들놈이 뭣하는지 알고싶었는대. 이제 이해할 수 있을 것 같습니다.</div>
                </div>
              </div>
            </div>
          </div>
          <img src={vectorIcon} alt="화살표" className="p-arrow" id="p-arrow3" onClick={handleReviewPage} /> 
        </div>
      </div>
      <InfoModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}