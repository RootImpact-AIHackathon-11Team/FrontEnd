import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // useNavigate 훅 import
import '../css/ProfileEdit.css';  // CSS 경로 수정
import backIcon from '../assets/images/Vector.svg';
import cameraIcon from '../assets/images/camera.svg';
import arrowIcon from '../assets/images/Vector2.svg';
import profileImage from '../assets/examples/mainEx6.png';

const ProfileEdit = () => {  // 함수 선언 방식 변경
  const navigate = useNavigate();  // 네비게이션 훅 사용
  const [nickname, setNickname] = useState('컴공 사이에 피어난 전쟁통');

  // 뒤로 가기 기능
  const handleBack = () => {
    navigate(-1);  // 이전 페이지로 이동
  };

  const handleNicknameEdit = () => {
    navigate('/profile/nickname');
  };

  return (
    <div className="editContainer">
      {/* 헤더 */}
      <div className="profileeditHeader">
        <img src={backIcon} alt="뒤로가기" className="profileeditbackButton" onClick={handleBack} />
        <h1 className="profileeditheaderTitle">내 정보 수정</h1>
      </div>

      {/* 프로필 이미지 섹션 */}
      <div className="profileImageSection">
        <div className="profileImageWrapper">
          <img src={profileImage} alt="프로필" className="profileeditprofileImage" />
          <div className="cameraIconWrapper">
            <img src={cameraIcon} alt="카메라" className="profileeditcameraIcon" />
          </div>
        </div>
      </div>

      {/* 프로필 정보 리스트 */}
      <div className="profileList">
        <div className="profileItem" onClick={handleNicknameEdit}>
          <span className="itemLabel">닉네임</span>
          <div className="itemContent">
            <span>{nickname}</span>
            <img src={arrowIcon} alt="화살표" className="profileeditarrowIcon" id="profileeditarrowIcon1"/>
          </div>
        </div>

        <div className="profileItem">
          <span className="itemLabel">한 줄 소개</span>
          <div className="itemContent">
            <span>나로 말할 것 같으면~자신감...</span>
            <img src={arrowIcon} alt="화살표" className="profileeditarrowIcon" id="profileeditarrowIcon2"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
