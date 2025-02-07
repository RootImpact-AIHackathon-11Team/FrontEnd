import React, { useState } from 'react';
import InfoModal from '../components/InfoModal'; // InfoModal 컴포넌트 import
import ProfileEdit from '../components/ProfileEdit'; // ProfileEdit 컴포넌트 import
import '../css/mypage.css';
import mainEx6 from '../assets/examples/mainEx6.png';
import paperIcon from '../assets/images/paper.svg';
import starIcon from '../assets/images/star.svg';
import vectorIcon from '../assets/images/Vector2.svg';
import questionIcon from '../assets/images/question.svg';

export default function MyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);  // 모달 상태 관리
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);  // '내 정보 수정' 페이지 상태 관리

  // 모달 열기
  const handleOpenModal = () => setIsModalOpen(true);
  // 모달 닫기
  const handleCloseModal = () => setIsModalOpen(false);
  // 프로필 편집 페이지 열기
  const handleProfileEdit = () => setIsProfileEditOpen(true);

  return (
    <div className="p-container">
      <h1 className="p-header">내 정보</h1>
      
      <div className="profileCard">
        <div className="profileInfo">
          <img src={mainEx6} alt="프로필" className="profileImage" />
          <div>
            <h2 className="profileName">컴공 사이에 피어난 전쟁통</h2>
            <p className="profileDesc">나로 말할 것 같으면~ 자신감있는 강사~</p>
          </div>
          <img src={vectorIcon} alt="화살표" className="arrow" id='arrow1' onClick={handleProfileEdit} />
        </div>

        <div className="temperatureSection">
          <div className="temperatureLabel">
            <div className="temperatureLeft">
              <span className="temperatureText">매너온도</span>
              <img src={questionIcon} alt="도움말" className="questionIcon" onClick={handleOpenModal} />
            </div>
            <span className="temperatureValue">36.5°C</span>
          </div>
          <div className="progressBar">
            <div className="progressFill" />
          </div>
        </div>
      </div>

      <div className="menuCard">
        <div className="menuContent">
          <img src={paperIcon} alt="강의" className="menuIcon" />
          <div className="menuTextContainer">
            <div className="menuTitle">등록한 강의</div>
            <div className="menuDesc">'배운데이'와 함께 작성한 강의 기획서들을 살펴볼 수 있어요</div>
          </div>
          <img src={vectorIcon} alt="화살표" className="arrow" />
        </div>
      </div>

      <div className="menuCard">
        <div className="menuContent">
          <img src={starIcon} alt="별점" className="menuIcon" />
          <div className="menuTextContainer">
            <div className="menuTitle">받은 평가</div>
            <div className="reviewList">
              <div className="reviewItem">
                <img src={mainEx6} alt="프로필" className="reviewerImage" />
                <div className="reviewContent">
                  <div className="reviewerName">조림핑</div>
                  <div className="reviewText">비전공자인 제가 듣기에도 알기 쉽게 설명해주셔서 평가는 5점으로 하겠습니다. 근데 이제 사심을 곁들인</div>
                </div>
              </div>
              <div className="reviewItem">
                <img src={mainEx6} alt="프로필" className="reviewerImage" />
                <div className="reviewContent">
                  <div className="reviewerName">마음은 어부</div>
                  <div className="reviewText">제나이 여든. 하나뿐인 아들놈이 뭣하는지 알고싶었는대. 이제 이해할 수 있을 것 같습니다.</div>
                </div>
              </div>
            </div>
          </div>
          <img src={vectorIcon} alt="화살표" className="arrow" />
        </div>
      </div>
      {isProfileEditOpen && <ProfileEdit />} {/* '내 정보 수정' 페이지 조건부 렌더링 */}
      <InfoModal isOpen={isModalOpen} onClose={handleCloseModal} /> {/* 모달 컴포넌트 추가 */}
    </div>
  );
}
