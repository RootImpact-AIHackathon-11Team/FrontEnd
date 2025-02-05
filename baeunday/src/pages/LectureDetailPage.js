import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/lectureDetail.css';
import backIcon from '../assets/images/left-arrow.svg';

// 더미 데이터 추가
const dummyLectures = {
  1: {
    title: '"디자인이 제일 쉬웠어요" - 하루만에 배우는 디자인 철학',
    image: '/path/to/image1.jpg',
    date: '2024-05-01',
    applicationPeriod: '2024-04-01 ~ 2024-04-30',
    fee: '무료',
    location: '구미시 거여동',
    description: '하루만에 배우는 디자인 철학에 대한 강의입니다.',
    currentApplicants: 50,
    maxApplicants: 100,
    inquiries: [
      { user: '홍길동', date: '2024-04-15', question: '온라인으로 진행하나요?', answer: '네, 온라인입니다.' }
    ]
  },
  2: {
    title: '"꽃... 좋아하세요?"',
    image: '/path/to/image2.jpg',
    date: '2024-06-10',
    applicationPeriod: '2024-05-01 ~ 2024-06-05',
    fee: '25,000원',
    location: '구미시 사곡동',
    description: '아름다운 꽃과 함께하는 힐링 강의입니다.',
    currentApplicants: 30,
    maxApplicants: 30,
    inquiries: [
      { user: '김철수', date: '2024-05-20', question: '꽃을 직접 가져와야 하나요?', answer: '아니요, 강의에서 제공합니다.' }
    ]
  },
  3: {
    title: '현직 대기업 개발자가 알려주는 개발자의 미래',
    image: '/path/to/image3.jpg',
    date: '2024-07-15',
    applicationPeriod: '2024-06-01 ~ 2024-07-10',
    fee: '무료',
    location: '구미시 송정동',
    description: '대기업 개발자로서의 커리어 개발에 대한 심층 강의입니다.',
    currentApplicants: 80,
    maxApplicants: 150,
    inquiries: [
      { user: '이영희', date: '2024-06-25', question: '온라인 강의인가요?', answer: '오프라인으로 진행됩니다.' }
    ]
  },
  4: {
    title: '기획: 전공자가 아니어도 할 수 있습니다.',
    image: '/path/to/image4.jpg',
    date: '2024-08-05',
    applicationPeriod: '2024-07-01 ~ 2024-08-01',
    fee: '무료',
    location: '구미시 산동읍',
    description: '비전공자를 위한 기획 강의로, 실무에서 바로 적용 가능한 팁을 제공합니다.',
    currentApplicants: 40,
    maxApplicants: 80,
    inquiries: [
      { user: '박민수', date: '2024-07-10', question: '기획 경험이 없어도 되나요?', answer: '네, 기초부터 시작합니다.' }
    ]
  },
  5: {
    title: '남녀노소 누구나 따라할 수 있는 홈트레이닝 강의',
    image: '/path/to/image5.jpg',
    date: '2024-09-12',
    applicationPeriod: '2024-08-01 ~ 2024-09-05',
    fee: '10,000원',
    location: '구미시 원평동',
    description: '간단한 동작으로도 큰 효과를 볼 수 있는 홈트레이닝 방법을 알려드립니다.',
    currentApplicants: 20,
    maxApplicants: 50,
    inquiries: [
      { user: '최수지', date: '2024-08-20', question: '준비물이 필요한가요?', answer: '편한 복장과 매트 정도면 충분합니다.' }
    ]
  }
};


const LectureDetailPage = () => {
  const { lectureId } = useParams();
  const navigate = useNavigate();
  const [lectureData, setLectureData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const data = dummyLectures[lectureId];

    if (data) {
      setLectureData(data);  // 더미 데이터 설정
    } else {
      setError('강의 정보를 찾을 수 없습니다.');
    }
  }, [lectureId]);

  if (error) return <div>Error: {error}</div>;
  if (!lectureData) return <div>Loading...</div>;

  return (
    <div className="lecture-detail-container">
      <header className="lecture-detail-header">
        <button onClick={() => navigate(-1)} className="lecture-detail-back-btn">
          <img src={backIcon} alt="Back" />
        </button>
        <h1>{lectureData.title}</h1>
      </header>

      <section className="lecture-detail-info">
        <img src={lectureData.image} alt={lectureData.title} className="lecture-detail-image" />
        <div className="lecture-detail-info-details">
          <p><strong>일시:</strong> {lectureData.date}</p>
          <p><strong>신청:</strong> {lectureData.applicationPeriod}</p>
          <p><strong>비용:</strong> {lectureData.fee}</p>
          <p><strong>장소:</strong> {lectureData.location}</p>
        </div>
      </section>

      <section className="lecture-detail-description">
        <h2>강의 설명</h2>
        <div dangerouslySetInnerHTML={{ __html: lectureData.description }}></div>
      </section>

      <section className="lecture-detail-application-status">
        <h2>신청 현황</h2>
        <div className="lecture-detail-progress-bar">
          <div
            className="lecture-detail-progress"
            style={{ width: `${(lectureData.currentApplicants / lectureData.maxApplicants) * 100}%` }}
          ></div>
        </div>
        <p>{lectureData.currentApplicants}/{lectureData.maxApplicants}명</p>
      </section>

      <section className="lecture-detail-inquiry-section">
        <h2>문의하기</h2>
        {lectureData.inquiries.map((inquiry, index) => (
          <div key={index} className="lecture-detail-inquiry-item">
            <p><strong>{inquiry.user}</strong> ({inquiry.date}): {inquiry.question}</p>
            {inquiry.answer && (
              <div className="lecture-detail-answer">
                <p><strong>답변:</strong> {inquiry.answer}</p>
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default LectureDetailPage;
