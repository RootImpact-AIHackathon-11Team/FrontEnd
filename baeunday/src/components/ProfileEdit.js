// src/components/ProfileEdit.js
import React from 'react';
import '../css/ProfileEdit.css'; // 스타일 시트 추가
import profileImage from '../assets/examples/mainEx6.png'; // 이미지 import

const ProfileEdit = () => {
  return (
    <div className="profileEditContainer">
      <h1>내 정보 수정</h1>
      <div className="profileDetails">
        <img src={profileImage} alt="프로필 이미지" className="profilePic" />
        <p>여기에 사용자 정보와 수정할 수 있는 폼을 추가할 수 있습니다.</p>
        <button>수정하기</button>
      </div>
    </div>
  );
};

export default ProfileEdit;
