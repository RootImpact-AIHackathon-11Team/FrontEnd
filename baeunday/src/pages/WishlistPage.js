import React from 'react';
import '../css/wishlist.css';
import AppliedHeader from '../components/AppliedHeader';
import mainEx1 from '../assets/examples/mainEx1.png';

const WishlistPage = () => {
  // 더미 데이터
  const wishlistItems = [
    {
      id: 1,
      title: '"디자인이 제일 쉬웠어요" - 하루만에 배우는 디자인 철학',
      location: '구미시 거여동',
      dDay: 99,
      price: '무료',
      status: '모집중',
      image: mainEx1
    },
    {
      id: 2,
      title: '"꽃... 좋아하세요?" 꽃처럼 아름다운 사장이 알려주는 꽃꽂이',
      location: '구미시 사곡동',
      dDay: 50,
      price: '25,000원',
      status: '인원 달성',
    },
    {
      id: 3,
      title: '현직 대기업 개발자가 알려주는 개발자의 미래',
      location: '구미시 송정동',
      dDay: 34,
      price: '무료',
      status: '모집중',
    }
  ];

  return (
    <div className="wishlist-container">
      <AppliedHeader />
      
      <div className="wishlist-content">
        {wishlistItems.map((item) => (
          <div key={item.id} className="wishlist-item">
            <div className="wishlist-image">
              <img src={item.image || mainEx1} alt={item.title} />
            </div>
            <div className="wishlist-info">
              <h2>{item.title}</h2>
              <p>{item.location} · D-{item.dDay} · {item.price}</p>
              <span className={`status-badge ${item.status === '모집중' ? 'recruiting' : 'completed'}`}>
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage; 