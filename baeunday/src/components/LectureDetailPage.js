import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/lectureDetail.css';
import LectureHeader from './LectureHeader';
import InquirySection from './InquirySection'; 
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

import mainEx1 from '../assets/examples/mainEx1.png';
import mainEx2 from '../assets/examples/mainEx2.png';
import mainEx3 from '../assets/examples/mainEx3.png';
import mainEx4 from '../assets/examples/mainEx4.png';
import mainEx5 from '../assets/examples/mainEx5.png';
import profileEx1 from '../assets/examples/profileEx1.png';
import profileDft from '../assets/examples/profileDft1.png';
import jjimedIcon from '../assets/images/jjimed.svg';

const dummyLectures = {
  1: {
    title: '"디자인이 제일 쉬웠어요" - 하루만에 배우는 디자인 철학',
    image: mainEx1,
    detail: `
## 1. 강의 개요\n\n\"포토샵 배우기\"는 디지털 이미지를 편집하고 싶어하는 학생 및 청년을 대상으로 하는 프로그램입니다. 이 프로그램은 Adobe Photoshop의 기본적인 기능부터 중급 수준의 편집 기법까지 체계적으로 배울 수 있도록 구성되어 있습니다.\n\n## 2. 강의 목표\n\n이 프로그램을 통해 참가자들은 포토샵의 기본적인 기능을 익히고, 이미지 편집, 보정, 디지털 아트 작업 등 다양한 분야에서 활용할 수 있는 실용적인 스킬을 배울 수 있습니다. 또한, 이를 통해 참가자들의 디지털 미디어에 대한 이해도와 창의력을 향상시키는 것이 목표입니다.\n\n## 3. 강의 대상\n\n- 포토샵에 관심 있는 학생 및 청년\n- 디지털 아트 및 디자인에 관심 있는 분\n- 포토샵을 활용하여 자신의 작품을 만들고 싶은 분\n\n## 4. 강의 운영 방식\n\n- 진행 형태 : 온라인 강의\n- 일정 : 주 1회, 1시간씩 총 10주간 진행\n- 강의료 : 10000원\n- 준비물 : Adobe Photoshop 설치된 PC\n\n# 5. 커리큘럼\n\n### 1주차 : 포토샵 기본 이해\n- 포토샵의 기본적인 인터페이스와 도구에 대한 이해\n\n### 2주차 : 기본 편집 기능\n- 셀렉션, 레이어, 마스크 등의 기본적인 편집 기능 학습\n\n#### 3주차 : 이미지 보정\n- 레벨, 커브, 색상 보정 등의 기능을 이용한 이미지 보정 기법 학습\n\n### 4주차 : 텍스트와 타이포그래피\n- 텍스트 입력, 편집, 스타일링 등에 대한 학습\n\n### 5주차 : 브러시와 패턴\n- 브러시와 패턴을 이용한 아트워크 제작 기법 학습\n\n### 6주차 : 레이어 스타일과 효과\n- 레이어 스타일과 필터를 이용한 다양한 효과 적용 방법 학습\n\n### 7주차 : 복합적인 이미지 편집\n- 배운 기법들을 종합하여 복합적인 이미지 편집 기법 학습\n\n### 8주차 : 애니메이션 기법\n- 프레임 애니메이션과 트위닝을 이용한 간단한 애니메이션 제작 기법 학습\n\n### 9주차 : 웹과 SNS에 최적화된 이미지 제작\n- 웹과 SNS에 최적화된 이미지 제작 방법 학습\n\n### 10주차 : 포트폴리오 제작\n- 배운 내용을 종합하여 자신만의 포트폴리오 제작\n\n# 6. 유의사항 \n\n- Adobe Photoshop 프로그램은 각자 설치해서 준비해주셔야 합니다.\n- 강의는 초보자를 대상으로 하지만, 컴퓨터 기본 조작은 알고 계셔야 합니다.\n\n# 7. 홍보 자료\n\n- 포토샵을 배우고 싶지만 어디서부터 시작해야 할지 모르겠다면? 이제부터 시작하세요! \"포토샵 배우기\" 강의에서는 기본부터 중급까지 체계적으로 배울 수 있습니다. 자신만의 디지털 아트워크를 만들어 보세요!
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

// manner 점수를 온도로 변환하는 함수 추가
const calculateTemperature = (manner) => {
  // manner는 0~10000 사이의 값이며, 10000이 만점
  // 36.5도를 기준으로 ±3.5도 범위 내에서 변환 (33도 ~ 40도)
  const baseTemp = 36.5;
  const range = 3.5;
  const normalizedManner = manner / 10000; // 0~1 사이 값으로 정규화
  const temperature = baseTemp + (normalizedManner - 0.5) * (range * 2);
  return temperature.toFixed(1);
};

// 매너 점수 비율 계산 함수
const getMannerPercentage = (manner) => {
  const maxManner = 10000; // 만점 10000보
  return (manner / maxManner) * 100; // 백분율로 변환
};

const LectureDetailPage = () => {
  const API_BASE_URL = 'http://43.202.15.40';
  const { lectureId } = useParams();
  const [lectureData, setLectureData] = useState(null);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState('조림핑');
  const [isOwner, setIsOwner] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLectureDetail = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('로그인이 필요합니다.');
          navigate('/login');
          return;
        }

        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': '*/*'
          }
        };

        // Request 로깅
        console.log('🚀 Request:', {
          method: 'GET',
          url: `${API_BASE_URL}/posts/${lectureId}`,
          headers: config.headers
        });

        const response = await axios.get(`${API_BASE_URL}/posts/${lectureId}`, config);

        // Response 로깅
        console.log('✅ Response:', response.data);

        if (response.data?.data?.body) {
          const lectureDetail = response.data.data.body;
          setLectureData({
            title: lectureDetail.title,
            image: lectureDetail.imgURL,
            date: lectureDetail.startDate,
            applicationPeriod: `${new Date(lectureDetail.startDate).toLocaleDateString()} ~ ${new Date(lectureDetail.endDate).toLocaleDateString()}`,
            fee: lectureDetail.fee === 0 ? '무료' : `${lectureDetail.fee.toLocaleString()}원`,
            location: `${lectureDetail.province} ${lectureDetail.city} ${lectureDetail.address}`,
            description: lectureDetail.content,
            instructor: lectureDetail.user.name,
            instructorTemperature: `${lectureDetail.user.manner}보`,
            currentApplicants: lectureDetail.participants,
            maxApplicants: lectureDetail.maximumPeople,
            minimumPeople: lectureDetail.minimumPeople,
            likeCount: lectureDetail.hearts,
            profileImg: lectureDetail.user.profileImgURL,
            isMyPost: lectureDetail.isMyPost,
            isHearted: lectureDetail.isHearted,
            status: lectureDetail.status,
            manner: lectureDetail.user.manner // 매너 점수 원본값 저장
          });
          setIsOwner(lectureDetail.isMyPost);
        }
      } catch (error) {
        console.error('❌ Error:', error);
        if (error.response?.status === 403) {
          localStorage.removeItem('token');
          setError('접근 권한이 없습니다.');
          navigate('/login');
        } else {
          setError('강의 정보를 불러오는데 실패했습니다.');
        }
      }
    };

    fetchLectureDetail();
  }, [lectureId, navigate]);

  const calculateProgress = (current, total) => {
    return (current / total) * 100;
  };

  // 사용자 전환 핸들러
  const handleUserChange = (e) => {
    setCurrentUser(e.target.value);
  };

  const handleInquiryClick = () => {
    navigate(`/lecture/${lectureId}/inquiries`, {
      state: {
        lectureData: lectureData,
        currentUser: currentUser
      }
    });
  };

  if (error) return <div>Error: {error}</div>;
  if (!lectureData) return <div>Loading...</div>;

  return (
    <div className="lecture-detail-wrapper">
      <div className="lecture-detail-container">
        <LectureHeader isInstructor={isOwner} />
        
        {/* 모드 선택 드롭다운 */}
        <select 
          onChange={handleUserChange} 
          value={currentUser}
          className="mode-selector"
        >
          <option value="조림핑">관람자 모드</option>
          <option value={lectureData?.instructor}>강사 모드</option>
        </select>

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
                  style={{ width: `${getMannerPercentage(lectureData.manner)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </section>
        <div className="lecture-detail-title">
          <h3>강의 설명</h3>
        </div>
        <div className="lecture-detail-description">
          {lectureData?.description ? (
            <ReactMarkdown>{lectureData.description}</ReactMarkdown>
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
              <div className="status-subtext">최소 인원 {lectureData.minimumPeople}명</div>
            </div>
          </div>
          <div className="like-info">
            <img src={jjimedIcon} alt="찜" className="jjimed-icon" />
            <span className="like-count">{lectureData.likeCount}</span>
          </div>
        </div>
        
        {/* 문의하기 섹션 수정 */}
        <div className={`inquiry-button-section ${!isOwner ? 'viewer-mode' : ''}`}>
          <h3>문의하기</h3>
          <div className="inquiry-button-wrapper">
            <button 
              className="inquiry-button"
              onClick={handleInquiryClick}
            >
              문의 전체보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureDetailPage;
