import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // axios import 추가
import '../css/DescriptionEdit.css';
import backIcon from '../assets/images/Vector.svg';  // 뒤로가기 아이콘 import

const DescriptionEdit = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);  // 로딩 상태 추가

  const handleBack = () => {
    navigate(-1);  // 브라우저의 히스토리에서 한 단계 뒤로 이동
  };

  const handleSubmit = async () => {
    if (!description.trim()) {
      alert('한 줄 소개를 입력해주세요.');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        alert('로그인이 필요합니다.');
        navigate('/login');
        return;
      }

      const response = await axios.put(
        'http://43.202.15.40/user/profile/field',
        { field: description },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.message === "한 줄 소개 수정 완료") {
        alert("한 줄 소개가 변경되었습니다.");
        navigate(-1);
      } else {
        alert("변경에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error('한 줄 소개 변경 에러:', error);
      
      if (error.response?.status === 401) {
        alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
        navigate('/login');
      } else {
        alert('한 줄 소개 변경에 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="description-container">
      <div className="description-header">
        <img 
          src={backIcon} 
          alt="뒤로가기" 
          className="description-back-button" 
          onClick={handleBack}  // 클릭 시 handleBack 함수 실행
        />
        <div className='description-header-title'>한 줄 소개 변경</div>
      </div>
      <div className="description-content">
        <span className="description-input">새로운 한 줄 소개를 입력해주세요</span>
        <input
          id="description-input"
          type="text"
          placeholder="나로 말할 것 같으면~ 자신감 있는 강사~"
          value={description}
          onChange={e => setDescription(e.target.value)}
          disabled={loading}
        />
        <div className="description-button-container">
          <button 
            className="description-button" 
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? '변경 중...' : '변경하기'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DescriptionEdit;
