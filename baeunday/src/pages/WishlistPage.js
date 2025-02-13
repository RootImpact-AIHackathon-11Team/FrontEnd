import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/wishlist.css';
import AppliedHeader from '../components/AppliedHeader';
import BottomNavigation from '../components/BottomNavigation';

const API_BASE_URL = 'http://43.202.15.40';

const WishlistPage = () => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [nextCursor, setNextCursor] = useState(null);
  const [nextId, setNextId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWishlist = useCallback(async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const config = {
        headers: {
          'Authorization': token.startsWith('Bearer ') ? token : `Bearer ${token}`,
          'Accept': '*/*'
        }
      };

      // 커서 기반 페이징 쿼리
      const url = nextCursor 
        ? `${API_BASE_URL}/hearts?cursor=${nextCursor}&id=${nextId}`
        : `${API_BASE_URL}/hearts`;

      const response = await axios.get(url, config);
      
      if (response.status === 200) {
        const { cursor, body } = response.data.data;
        
        // body나 body.postList가 null일 경우 빈 배열로 처리
        const postList = body?.postList || [];
        
        setWishlistItems(prev => 
          nextCursor 
            ? [...prev, ...postList]
            : postList
        );
        
        // cursor가 있을 경우에만 페이징 정보 업데이트
        if (cursor) {
          setHasMore(cursor.hasNext);
          setNextCursor(cursor.nextCursor);
          setNextId(cursor.nextId);
        } else {
          setHasMore(false);
          setNextCursor(null);
          setNextId(null);
        }
      }
    } catch (error) {
      console.error('찜 목록 조회 실패:', error);
      if (error.response?.status === 403) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } finally {
      setIsLoading(false);
    }
  }, [navigate, nextCursor, nextId]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleScroll = useCallback((e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    
    if (!isLoading && hasMore && scrollHeight - scrollTop <= clientHeight + 100) {
      fetchWishlist();
    }
  }, [fetchWishlist, isLoading, hasMore]);

  const handleLectureClick = (lectureId) => {
    navigate(`/lecture/${lectureId}`);
  };

  // deadline을 D-day로 변환하는 함수 수정
  const calculateDday = (deadline) => {
    const today = new Date();
    const dueDate = new Date(deadline);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // 음수일 경우 D+로 표시
    return diffDays < 0 ? `D+${Math.abs(diffDays)}` : `D-${diffDays}`;
  };

  return (
    <div className="wishlist-container">
      <AppliedHeader title="찜" />
      
      <div className="wishlist-content" onScroll={handleScroll}>
        {wishlistItems.length > 0 ? (
          wishlistItems.map((item) => (
            <div 
              key={item.postId} 
              className="wishlist-item"
              onClick={() => handleLectureClick(item.postId)}
            >
              <div className="wishlist-image">
                <img src={item.imgURL} alt={item.title} />
              </div>
              <div className="wishlist-info">
                <h2>{item.title}</h2>
                <p>
                  <span>
                    {item.province} {item.city} · {calculateDday(item.deadline)} · 
                    <span style={{ color: '#216CFA' }}>
                      {item.fee === 0 ? '무료' : `${item.fee.toLocaleString()}원`}
                    </span>
                  </span>
                  <span className={`status-badge ${item.status === 'AVAILABLE' ? 'recruiting' : 'completed'}`}>
                    {item.status === 'AVAILABLE' ? '모집중' : item.status === 'ING' ? '진행중' : '종료'}
                  </span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="no-wishlist">
            <p>찜한 강의가 없습니다.</p>
          </div>
        )}
        {isLoading && <div className="loading">로딩 중...</div>}
      </div>
      <BottomNavigation />
    </div>
  );
};

export default WishlistPage; 