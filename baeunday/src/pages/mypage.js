import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InfoModal from '../components/InfoModal';
import ReviewPage from '../components/ReviewPage';
import BottomNavigation from '../components/BottomNavigation';
import '../css/mypage.css';
import mainEx6 from '../assets/examples/mainEx6.png';
import paperIcon from '../assets/images/paper.svg';
import starIcon from '../assets/images/star.svg';
import vectorIcon from '../assets/images/Vector2.svg';
import questionIcon from '../assets/images/question.svg';

export default function MyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: '',
    profileImg: '',
    field: ''
  });
  const navigate = useNavigate();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleProfileEdit = () => navigate('/profile/edit');
  const handleReviewPage = () => navigate('/mypage/review');
  const handleRegisteredLecturePage = () => navigate('/registered');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // 모든 가능한 토큰 확인
        const token = localStorage.getItem('token');
        
        console.log('=== API Request Debug Info ===');
        console.log('1. Request URL:', 'https://mannajang.store/api/user/profile');
        console.log('2. Request Method:', 'GET');
        
        const finalToken = `Bearer ${token.replace('Bearer ', '')}`;
        const headers = {
          'Authorization': finalToken,
          'Accept': '*/*',
          'Content-Type': 'application/json'
        };
        
        console.log('3. Request Headers:', headers);
        console.log('4. Token Details:');
        console.log('   - Raw token:', token);
        console.log('   - Final token:', finalToken);
        console.log('   - Token length:', finalToken.length);
        
        const response = await axios.get('https://mannajang.store/api/user/profile', { headers });
        
        console.log('=== API Response Debug Info ===');
        console.log('1. Response Status:', response.status);
        console.log('2. Response Headers:', response.headers);
        console.log('3. Response Data:', response.data);
        console.log('================================');

        if (response.data) {
          const userData = {
            name: response.data.name || '',
            profileImg: response.data.profileImg || '',
            field: response.data.field || ''
          };
          
          console.log('4. Parsed User Data:', userData);
          setUserProfile(userData);
        } else {
          console.error('Invalid response structure:', response.data);
        }

      } catch (error) {
        console.error('Profile fetch error:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data
        });
        if (error.response?.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchUserProfile();
  }, [navigate]);

  return (
    <div className="p-container">
      <h1 className="p-header">내 정보</h1>
      
      <div className="p-profileCard">
        <div className="p-profileInfo">
          <img src={userProfile.profileImg || mainEx6} alt="프로필" className="p-profileImage" />
          <div>
            <h2 className="p-profileName">{userProfile.name || '로딩 중...'}</h2>
            <p className="p-profileDesc">{userProfile.field || '기본 필드'}</p>
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
          <img src={vectorIcon} alt="화살표" className="p-arrow" id='p-arrow2' onClick={handleRegisteredLecturePage} />
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
      <BottomNavigation />
    </div>
  );
}
