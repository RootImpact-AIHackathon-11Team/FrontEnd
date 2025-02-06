import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/lectureDetail.css';
import LectureHeader from './LectureHeader';
import InquirySection from './InquirySection'; 
import ReactMarkdown from 'react-markdown';


import mainEx1 from '../assets/examples/mainEx1.png';
import mainEx2 from '../assets/examples/mainEx2.png';
import mainEx3 from '../assets/examples/mainEx3.png';
import mainEx4 from '../assets/examples/mainEx4.png';
import mainEx5 from '../assets/examples/mainEx5.png';
import profileEx1 from '../assets/examples/profileEx1.png';
import profileDft from '../assets/examples/profileDft1.png';

const dummyLectures = {
  1: {
    title: '"디자인이 제일 쉬웠어요" - 하루만에 배우는 디자인 철학',
    image: mainEx1,
    detail: `
### 1. 강의 개요
디자인이 제일 쉬웠어요는 디자인 초심자도 쉽게 이해할 수 있도록 디자인의 본질과 철학을 하루 만에 익히는 강의입니다. 디자인 원리를 단순히 배우는 것이 아니라, 실습과 사례 분석을 통해 직관적으로 이해할 수 있도록 구성되었습니다.

### 2. 강의 목표
- 디자인의 기본 개념과 철학을 이해한다.
- 디자인 원칙을 실제 사례를 통해 익힌다.
- 디자인적 사고를 실생활과 업무에 적용하는 방법을 배운다.

### 3. 강의 대상
- 디자인을 처음 접하는 일반인 및 직장인
- 디자인을 이해하고 싶은 기획자, 마케터, 창업자
- 직관적이고 효율적인 디자인 사고를 익히고 싶은 분

### 4. 강의 운영 방식
- 진행 형태: 오프라인 강의
- 일정: 1일 단기 강의 (총 4시간)
- 장소: 구미역 내 강의실
- 강의료: 무료
- 준비물: 필기도구, 노트북(선택 사항)

### 5. 커리큘럼
1일차 디자인의 본질과 철학 (이론)
   - 디자인이란 무엇인가?
   - 좋은 디자인의 원칙 (예: 간결함, 직관성, 조화 등)
   - 세계적 디자이너들의 철학과 접근 방식

2일차 실생활 속 디자인 사고 적용법
   - 일상에서 디자인이 활용되는 사례 분석
   - 브랜드, 제품, UI/UX 디자인 사례 비교
   - 디자인을 통해 문제 해결하기

3일차 실습 - 나만의 디자인 원칙 정리
   - 간단한 디자인 실습 (로고, 포스터, 슬라이드 등)
   - 참가자별 피드백 및 개선 포인트 도출
   - 디자인 철학을 정리하여 공유하기

### 6. 기대 효과
- 디자인 철학과 개념을 쉽게 이해하고 활용 가능
- 시각적 사고 및 문제 해결 능력 향상
- 디자인을 통한 창의적 아이디어 발굴

### 7. 추가 안내 사항
- 모든 프로그램은 강의 종료 후 PDF 파일로 제공됩니다.
- 수료증 발급 (참가자 요청 시)
- 강의 신청은 선착순 마감되며, 환불 및 변경 규정은 별도 안내드립니다.
    `,
    date: '2024-05-01',
    applicationPeriod: '2024-04-01 ~ 2024-04-30',
    fee: '무료',
    location: '구미시 거여동',
    description: '하루만에 배우는 디자인 철학에 대한 강의입니다.',
    instructor: '컴공 사이에 피어난 전쟁통',
    instructorTemperature: '36.5℃',
    currentApplicants: 10,
    maxApplicants: 30,
    profileImg: profileEx1,
    inquiries: [
      {
        id: 1,
        user: "조림핑",
        date: "2025-02-02",
        question: "조릴 수 있나요? 디자인도?",
        profileImg: profileEx1,  // 프로필 이미지 import 필요
        answer: null
      },
      {
        id: 2,
        user: "마음은 어부",
        date: "2025-01-28",
        question: "이것하면 마누라가..이뻐해줄니까.",
        profileImg: profileDft,  // 기본 프로필 이미지
        answer: {
          date: "2025-01-28",
          content: "안녕하세요, 마음은 어부님!\n문의에 답변 드립니다. :)\n\n아내 분께서 평소에 아름다움에 관심이 많으셨다면 충분히 인정받으실 수 있을 것 같습니다 ㅎㅎ",
          profileImg: profileEx1  // 강사 프로필 이미지
        }
      }
    ]
  },
  2: {
    title: '"꽃... 좋아하세요?"',
    image: mainEx2,
    date: '2024-06-10',
    applicationPeriod: '2024-05-01 ~ 2024-06-05',
    fee: '25,000원',
    location: '구미시 사곡동',
    description: '아름다운 꽃과 함께하는 힐링 강의입니다.',
    instructor: '플로리스트 김철수',
    instructorTemperature: '36.7℃',
    currentApplicants: 30,
    maxApplicants: 30,
    inquiries: [
      { user: '김철수', date: '2024-05-20', question: '꽃을 직접 가져와야 하나요?', answer: '아니요, 강의에서 제공합니다.' }
    ]
  },
  3: {
    title: '현직 대기업 개발자가 알려주는 개발자의 미래',
    image: mainEx3,
    date: '2024-07-15',
    applicationPeriod: '2024-06-01 ~ 2024-07-10',
    fee: '무료',
    location: '구미시 송정동',
    description: '대기업 개발자로서의 커리어 개발에 대한 심층 강의입니다.',
    instructor: '개발자 진개발',
    instructorTemperature: '37.0℃',
    currentApplicants: 80,
    maxApplicants: 150,
    inquiries: [
      { user: '이영희', date: '2024-06-25', question: '온라인 강의인가요?', answer: '오프라인으로 진행됩니다.' }
    ]
  },
  4: {
    title: '기획: 전공자가 아니어도 할 수 있습니다.',
    image: mainEx4,
    date: '2024-08-05',
    applicationPeriod: '2024-07-01 ~ 2024-08-01',
    fee: '무료',
    location: '구미시 산동읍',
    description: '비전공자를 위한 기획 강의로, 실무에서 바로 적용 가능한 팁을 제공합니다.',
    instructor: '기획자 조기획',
    instructorTemperature: '36.8℃',
    currentApplicants: 40,
    maxApplicants: 80,
    inquiries: [
      { user: '박민수', date: '2024-07-10', question: '기획 경험이 없어도 되나요?', answer: '네, 기초부터 시작합니다.' }
    ]
  },
  5: {
    title: '남녀노소 누구나 따라할 수 있는 홈트레이닝 강의',
    image: mainEx5,
    date: '2024-09-12',
    applicationPeriod: '2024-08-01 ~ 2024-09-05',
    fee: '10,000원',
    location: '구미시 원평동',
    description: '간단한 동작으로도 큰 효과를 볼 수 있는 홈트레이닝 방법을 알려드립니다.',
    instructor: '트레이너 김희현',
    instructorTemperature: '36.9℃',
    currentApplicants: 20,
    maxApplicants: 50,
    inquiries: [
      { user: '최수지', date: '2024-08-20', question: '준비물이 필요한가요?', answer: '편한 복장과 매트 정도면 충분합니다.' }
    ]
  }
};

const getTemperaturePercentage = (temp) => {
  const tempNumber = parseFloat(temp.replace('℃', ''));
  const minTemp = 0;
  const maxTemp = 100; // 기준 최대 온도
  const percentage = ((tempNumber - minTemp) / (maxTemp - minTemp)) * 100;

  return Math.min(100, Math.max(0, percentage)); // 0% ~ 100% 사이로 제한
};


const LectureDetailPage = () => {
  
  const { lectureId } = useParams();
  const [lectureData, setLectureData] = useState(null);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState('현재 사용자');  // 기본값을 '현재 사용자'로 변경

  const [isOwner, setIsOwner] = useState(false); // 작성자인지 여부

  useEffect(() => {
    const data = dummyLectures[lectureId];
    if (data) {
      setLectureData(data);
    } else {
      setError('강의 정보를 찾을 수 없습니다.');
    }
  }, [lectureId]);

  useEffect(() => {
    // 더미 데이터 가져오기
    const data = dummyLectures[lectureId];
    if (data) {
      setLectureData(data);
      // 작성자와 현재 사용자를 비교하여 isOwner 설정
      setIsOwner(currentUser === data.instructor);
    }
  }, [lectureId, currentUser]);

  const calculateProgress = (current, total) => {
    return (current / total) * 100;
  };

  // 사용자 전환 핸들러
  const handleUserChange = (e) => {
    setCurrentUser(e.target.value);
  };

  if (error) return <div>Error: {error}</div>;
  if (!lectureData) return <div>Loading...</div>;

  return (
    <div className="lecture-detail-container">
      <LectureHeader />


      <section className="lecture-detail-info">
        <div className="lecture-detail-top">
          <img src={lectureData.image} alt={lectureData.title} className="lecture-detail-image" />
          <div className="lecture-detail-info-details">
            <h2>{lectureData.title}</h2>
            <p><strong>일시</strong> {lectureData.date}</p>
            <p><strong>신청</strong> {lectureData.applicationPeriod}</p>
            <p><strong>비용</strong> {lectureData.fee}</p>
            <p><strong>장소</strong> {lectureData.location}</p>
          </div>
        </div>
        <div className="lecture-detail-instructor">
          <img 
            src={lectureData.profileImg || profileDft} 
            alt="강사 프로필" 
            className="instructor-image" 
          />
          <div className="instructor-info">
            <p className="instructor-name">{lectureData.instructor}</p>
            <p className="instructor-date">2025-01-28</p>
          </div>
          <div className="temperature-container">
            <span className="lecture-detail-temperature">{lectureData.instructorTemperature}</span>
            <div className="temperature-bar">
              <div 
                className="temperature-fill" 
                style={{ width: `${getTemperaturePercentage(lectureData.instructorTemperature)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </section>
      <div className="lecture-detail-title">
      <h3>강의 설명</h3>
      </div>
      <div className="lecture-detail-description">
        
        {lectureData.detail ? (
          <ReactMarkdown>{lectureData.detail}</ReactMarkdown>
        ) : (
          <p>강의 설명이 없습니다.</p>
        )}
      </div>
      <div className="divider">
      <h3></h3>
      </div>
      <div className="application-status">
      <h3>신청 현황</h3>
        <div className="status-circle">
          <svg width="180" height="180" viewBox="0 0 180 180">
            {/* 배경 원 */}
            <circle
              cx="90"
              cy="90"
              r="80"
              fill="none"
              stroke="#E0E0E0"
              strokeWidth="14"
            />
            {/* 진행도를 나타내는 원 */}
            <circle
              cx="90"
              cy="90"
              r="80"
              fill="none"
              stroke="#216CFA"
              strokeWidth="14"
              strokeDasharray={`${2 * Math.PI * 80}`}
              strokeDashoffset={`${2 * Math.PI * 80 * (1 - calculateProgress(lectureData.currentApplicants, lectureData.maxApplicants) / 100)}`}
            />
          </svg>
          <div className="status-text">
            <div className="status-number">{lectureData.currentApplicants}/{lectureData.maxApplicants}명</div>
            <div className="status-subtext">최소 인원 5명</div>
          </div>
        </div>
      </div>
      <div className="lecture-detail-container">
      {/* 사용자 전환 드롭다운 */}
    <select onChange={handleUserChange} value={currentUser}>
      <option value="현재 사용자">관람자 모드</option>
      <option value="컴공 사이에 피어난 전쟁통">강사 모드</option>
    </select>
      {/* currentUser prop 전달 */}
      <InquirySection 
        lectureData={lectureData} 
        currentUser={currentUser}  // currentUser 전달
      />
    </div>
      
    </div>
  );
};

export default LectureDetailPage;
