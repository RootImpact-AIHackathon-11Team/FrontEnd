import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InquiryHeader from '../components/InquiryHeader';
import InquirySection from '../components/InquirySection';
import axios from 'axios';
import '../css/inquiryPage.css';

const API_BASE_URL = 'https://mannajang.store/api';

const InquiryPage = () => {
  const { lectureId } = useParams();
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLectureInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('로그인이 필요합니다.');
          return;
        }

        const config = {
          headers: {
            'Authorization': token.startsWith('Bearer ') ? token : `Bearer ${token}`,
            'Accept': '*/*'
          }
        };

        const response = await axios.get(`${API_BASE_URL}/posts/${lectureId}`, config);
        
        if (response.data?.data?.body) {
          setIsOwner(response.data.data.body.isMyPost);
        }
      } catch (error) {
        console.error('강의 정보 조회 실패:', error);
        setError('강의 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchLectureInfo();
  }, [lectureId]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="inquiry-page">
      <InquiryHeader title="문의" />
      <InquirySection 
        lectureId={lectureId}
        isOwner={isOwner}
      />
    </div>
  );
};

export default InquiryPage; 