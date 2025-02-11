import React, { useState } from 'react';
import '../css/LectureRegister.css';
import vectorIcon from '../assets/images/Vector.svg';
import { useNavigate } from 'react-router-dom';
import questionIcon from '../assets/images/question.svg';
import LectureGuideModal from '../components/LectureGuideModal'
import locationIcon from '../assets/images/location.svg';
import arrowDownIcon from '../assets/images/down-arrow.svg';
import LecturePreview from './LecturePreview';

// 지역 데이터
const regionData = {
  서울: ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'],
  경기: ['고양시', '과천시', '광명시', '광주시', '구리시', '군포시', '김포시', '남양주시', '동두천시', '부천시', '성남시', '수원시', '시흥시', '안산시', '안성시', '안양시', '양주시', '여주시', '오산시', '용인시', '의왕시', '의정부시', '이천시', '파주시', '평택시', '포천시', '하남시', '화성시'],
  인천: ['계양구', '남동구', '동구', '미추홀구', '부평구', '서구', '연수구', '중구'],
  강원: ['강릉시', '동해시', '삼척시', '속초시', '원주시', '춘천시'],
  충남: ['계룡시', '공주시', '논산시', '당진시', '보령시', '서산시', '아산시', '천안시'],
  대전: ['대덕구', '동구', '서구', '유성구', '중구'],
  충북: ['제천시', '청주시', '충주시'],
  세종: ['세종시'],
  부산: ['강서구', '금정구', '남구', '동구', '동래구', '부산진구', '북구', '사상구', '사하구', '서구', '수영구', '연제구', '영도구', '중구', '해운대구'],
  울산: ['남구', '동구', '북구', '중구', '울주군'],
  대구: ['남구', '달서구', '동구', '북구', '서구', '수성구', '중구'],
  경북: ['경산시', '경주시', '구미시', '김천시', '문경시', '상주시', '안동시', '영주시', '영천시', '포항시'],
  경남: ['거제시', '김해시', '밀양시', '사천시', '양산시', '진주시', '창원시', '통영시'],
  전남: ['광양시', '나주시', '목포시', '순천시', '여수시'],
  광주: ['광산구', '남구', '동구', '북구', '서구'],
  전북: ['군산시', '김제시', '남원시', '익산시', '전주시', '정읍시'],
  제주: ['서귀포시', '제주시'],
  전국: ['전체']
};

const LectureRegister = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('전국');
  const [selectedSubRegion, setSelectedSubRegion] = useState('전체');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleQuestionClick = () => {
    setIsModalOpen(true);
  };

  const handleRegionChange = (e) => {
    const region = e.target.value;
    setSelectedRegion(region);
    setSelectedSubRegion(''); // 대분류 변경시 소분류 초기화
  };

  // 연도 옵션 생성 (2025년부터 시작)
  const years = Array.from({length: 10}, (_, i) => 2025 + i);
  
  // 월 옵션 생성 (1-12월)
  const months = Array.from({length: 12}, (_, i) => i + 1);
  
  // 일 옵션 생성 (1-31일)
  const days = Array.from({length: 31}, (_, i) => i + 1);

  const selectStyle = {
    backgroundImage: `url(${arrowDownIcon})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 15px center',
    backgroundSize: '12px'
  };

  const handleOpenPreview = () => {
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  return (
    <div className="lecture-register-container">
      <div className="lecture-register-header">
        <img 
          src={vectorIcon} 
          alt="뒤로가기" 
          className="lecture-register-back"
          onClick={handleBack}
        />
        <h1 className="lecture-register-title">강의 기획서 생성하기</h1>
        <img 
          src={questionIcon} 
          alt="도움말" 
          className="lecture-register-help"
          onClick={handleQuestionClick}
        />
      </div>
      <div className="lecture-register-content">
        <div className="lecture-register-question">
          어떤 주제로 강의를 하고 싶나요?
          <span className="lecture-register-required">*</span>
        </div>

        <div className="lecture-register-inputs">
          <input
            type="text"
            className="lecture-register-input"
            placeholder="강의명 (ex: 홈베이킹 기초 클래스)"
          />
          <input
            type="text"
            className="lecture-register-input"
            placeholder="[선택] 강의 목표 (ex: 지역 특산물을 활용한 디저트 만들기)"
          />
          <input
            type="text"
            className="lecture-register-input"
            placeholder="[선택] 강의 개요 (ex: 기초 제빵 기술과 지역 특산물을 활용한 응용법을 배운다.)"
          />
        </div>

        <div className="lecture-register-checkbox">
          <input type="checkbox" id="aiRecommend" />
          <label htmlFor="aiRecommend">AI 추천</label>
        </div>

        <div className="lecture-register-section">
          <div className="lecture-register-question">
            어떻게 진행하나요?
            <span className="lecture-register-required">*</span>
          </div>

          <div className="lecture-register-option-group">
            <p className="lecture-register-label">강의 대상</p>
            <div className="lecture-register-checkbox-row">
              <label className="lecture-register-checkbox-label">
                <input type="checkbox" name="target" value="소년" />
                소년
              </label>
              <label className="lecture-register-checkbox-label">
                <input type="checkbox" name="target" value="청소년" />
                청소년
              </label>
              <label className="lecture-register-checkbox-label">
                <input type="checkbox" name="target" value="청년" />
                청년
              </label>
              <label className="lecture-register-checkbox-label">
                <input type="checkbox" name="target" value="중년이상" />
                중년 이상
              </label>
            </div>
          </div>

          <div className="lecture-register-option-group">
            <p className="lecture-register-label">강의 난이도</p>
            <div className="lecture-register-radio-row">
              <label className="lecture-register-radio-label">
                <input type="radio" name="level" value="초급" />
                초급
              </label>
              <label className="lecture-register-radio-label">
                <input type="radio" name="level" value="중급" />
                중급
              </label>
              <label className="lecture-register-radio-label">
                <input type="radio" name="level" value="상급" />
                상급
              </label>
            </div>
          </div>

          <div className="lecture-register-option-group">
            <p className="lecture-register-label">강의 형태</p>
            <div className="lecture-register-radio-row">
              <label className="lecture-register-radio-label">
                <input type="radio" name="type" value="이론" />
                이론 강의
              </label>
              <label className="lecture-register-radio-label">
                <input type="radio" name="type" value="체험형" />
                체험형 강의
              </label>
              <label className="lecture-register-radio-label">
                <input type="radio" name="type" value="견학" />
                견학 강의
              </label>
            </div>
          </div>

          <div className="lecture-register-option-group">
            <p className="lecture-register-label">신청 금액</p>
            <div className="lecture-register-radio-row">
              <label className="lecture-register-radio-label">
                <input type="radio" name="fee" value="free" />
                무료
              </label>
              <label className="lecture-register-radio-label">
                <input type="radio" name="fee" value="paid" />
                유료
              </label>
            </div>
          </div>
        </div>

        {/* 시작 날짜 섹션 */}
        <div className="lecture-register-section">
          <div className="lecture-register-question">
            언제 시작하나요?
            <span className="lecture-register-required">*</span>
          </div>

          <div className="lecture-register-date-inputs">
            <select 
              className="lecture-register-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="" disabled>연도 선택</option>
              {years.map(year => (
                <option key={year} value={year}>
                  {year}년
                </option>
              ))}
            </select>

            <select 
              className="lecture-register-select"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="" disabled>월 선택</option>
              {months.map(month => (
                <option key={month} value={month}>
                  {month}월
                </option>
              ))}
            </select>

            <select 
              className="lecture-register-select"
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
            >
              <option value="" disabled>일 선택</option>
              {days.map(day => (
                <option key={day} value={day}>
                  {day}일
                </option>
              ))}
            </select>
          </div>

          <input
            type="text"
            className="lecture-register-input"
            placeholder="강의 회차"
          />
        </div>

        {/* 위치 섹션 */}
        <div className="lecture-register-section">
          <div className="lecture-register-question">
            원하는 위치가 있나요?
            <span className="lecture-register-required">*</span>
          </div>

          <div className="lecture-register-location">
            <div className="lecture-register-location-selects">
              <div className="location-select-wrapper">
                <div className="select-with-icon">
                  <img src={locationIcon} alt="" className="location-icon" />
                </div>
                <select 
                  className="lecture-register-select location-select"
                  value={selectedRegion}
                  onChange={handleRegionChange}
                >
                  <option value="" disabled>전국</option>
                  {Object.keys(regionData).map(region => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
              <div className="location-select-wrapper">
                <select 
                  className="lecture-register-select"
                  value={selectedSubRegion}
                  onChange={(e) => setSelectedSubRegion(e.target.value)}
                  disabled={!selectedRegion || selectedRegion === '전국'}
                >
                  <option value="" disabled>전체</option>
                  {selectedRegion && regionData[selectedRegion]?.map(subRegion => (
                    <option key={subRegion} value={subRegion}>
                      {subRegion}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <input
              type="text"
              className="lecture-register-input"
              placeholder="장소"
            />
            <label className="lecture-register-checkbox">
              <input type="checkbox" />
              <span>장소 미정</span>
            </label>
          </div>
        </div>

        {/* 수강 인원 섹션 */}
        <div className="lecture-register-section">
          <div className="lecture-register-question">
            수강 인원은 어느 정도가 적당한가요?
            <span className="lecture-register-required">*</span>
          </div>

          <div className="lecture-register-student-inputs">
            <select className="lecture-register-select">
              <option value="" disabled selected>최소 인원</option>
            </select>
            <select className="lecture-register-select">
              <option value="" disabled selected>최대 인원</option>
            </select>
          </div>
        </div>

        {/* 신경써야 할 점 섹션 */}
        <div className="lecture-register-section">
          <div className="lecture-register-question">
            그외에 신경써야 하는 점이 있나요?
          </div>
          <input
            type="text"
            className="lecture-register-input"
            placeholder="ex) 준비물로 앞치마가 필요, 시간 따라 다른 수업으로 진행"
          />
        </div>
      </div>

      {/* 하단 버튼 영역 */}
      <div className="lecture-register-bottom-buttons">
        <button className="lecture-register-draft-button">
          직접 작성
        </button>
        <button className="lecture-register-submit-button" onClick={handleOpenPreview}>
          생성하기
        </button>
      </div>

      <LectureGuideModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {isPreviewOpen && (
        <LecturePreview 
          isOpen={isPreviewOpen} 
          onClose={handleClosePreview} 
        />
      )}
    </div>
  );
};
export default LectureRegister;
