import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/ProfileEdit.css';
import backIcon from '../assets/images/Vector.svg';
import cameraIcon from '../assets/images/camera.svg';
import arrowIcon from '../assets/images/Vector2.svg';
import profileImage from '../assets/examples/mainEx6.png';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('컴공 사이에 피어난 전쟁');

  const handleBack = () => {
    navigate(-1);
  };

  const handleNicknameEdit = () => {
    navigate('/profile/nickname');
  };

  const handleDescriptionEdit = () => {
    navigate('/profile/description');
  };

  return (
    <div className="editContainer">
      <div className="profileeditHeader">
        <img src={backIcon} alt="뒤로가기" className="profileeditbackButton" onClick={handleBack} />
        <h1 className="profileeditheaderTitle">내 정보 수정</h1>
      </div>

      <div className="profileImageSection">
        <div className="profileImageWrapper">
          <img src={profileImage} alt="프로필" className="profileeditprofileImage" />
          <div className="cameraIconWrapper">
            <img src={cameraIcon} alt="카메라" className="profileeditcameraIcon" />
          </div>
        </div>
      </div>

      <div className="profileList">
        <div className="profileItem" onClick={handleNicknameEdit}>
          <span className="itemLabel">닉네임</span>
          <div className="itemContent">
            <span>{nickname}</span>
            <img src={arrowIcon} alt="화살표" className="profileeditarrowIcon" />
          </div>
        </div>

        <div className="profileItem" onClick={handleDescriptionEdit}>
          <span className="itemLabel">한 줄 소개</span>
          <div className="itemContent">
            <span>나로 말할 것 같으면~자신감...</span>
            <img src={arrowIcon} alt="화살표" className="profileeditarrowIcon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
