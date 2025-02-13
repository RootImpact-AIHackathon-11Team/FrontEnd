import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/ProfileEdit.css';
import backIcon from '../assets/images/Vector.svg';
import cameraIcon from '../assets/images/camera.svg';
import arrowIcon from '../assets/images/Vector2.svg';
import profileImage from '../assets/examples/mainEx6.png';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: '',
    profileImg: '',
    field: ''
  });
  const fileInputRef = useRef(null);

  // 프로필 데이터 가져오기
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('http://43.202.15.40/user/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch profile data');
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleNicknameEdit = () => {
    navigate('/profile/nickname');
  };

  const handleDescriptionEdit = () => {
    navigate('/profile/description');
  };

  const handleCameraIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('image', file);

      // FormData 내용 확인
      console.log('Request Body (FormData):');
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ', pair[1]);
      }

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(
        `http://43.202.15.40/user/profile/img/upload?deleteImage=${profileData.profileImg || ''}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error Response:', errorData);
        throw new Error(errorData.message || 'Failed to upload image');
      }

      const data = await response.json();
      console.log('Response Body:', data);

      setProfileData(prevData => ({
        ...prevData,
        name: data.name,
        profileImg: data.profileImg
      }));

    } catch (error) {
      console.error('Error uploading image:', error);
      // 에러 처리 (예: 토스트 메시지 표시)
    }
  };

  return (
    <div className="editContainer">
      <div className="profileeditHeader">
        <img src={backIcon} alt="뒤로가기" className="profileeditbackButton" onClick={handleBack} />
        <h1 className="profileeditheaderTitle">내 정보 수정</h1>
      </div>

      <div className="profileImageSection">
        <div className="profileImageWrapper">
          <img 
            src={profileData.profileImg || profileImage} 
            alt="프로필" 
            className="profileeditprofileImage" 
          />
          <div className="cameraIconWrapper" onClick={handleCameraIconClick}>
            <img src={cameraIcon} alt="카메라" className="profileeditcameraIcon" />
          </div>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/*" // Accept only images
        onChange={handleFileChange}
      />

      <div className="profileList">
        <div className="profileItem" onClick={handleNicknameEdit}>
          <span className="itemLabel">닉네임</span>
          <div className="itemContent">
            <span>{profileData.name}</span>
            <img src={arrowIcon} alt="화살표" className="profileeditarrowIcon" />
          </div>
        </div>

        <div className="profileItem" onClick={handleDescriptionEdit}>
          <span className="itemLabel">한 줄 소개</span>
          <div className="itemContent">
            <span>{profileData.field || '한 줄 소개를 입력해주세요'}</span>
            <img src={arrowIcon} alt="화살표" className="profileeditarrowIcon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
