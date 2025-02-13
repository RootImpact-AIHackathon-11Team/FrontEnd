import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Survey5.css';
import vectorIcon from '../assets/images/Vector.svg';
import questionIcon from '../assets/images/question.svg';
import SurveyQuestion from '../components/survey_question';
import foot5 from '../assets/images/foot5.png';

const Survey5 = () => {
  const navigate = useNavigate();
  const [showSurveyQuestion, setShowSurveyQuestion] = useState(false);
  const [inputText, setInputText] = useState(""); // 입력값 상태 추가

  const handleBack = () => {
    navigate(-1);
  };

  const handleQuestionClick = () => {
    setShowSurveyQuestion(true);
  };

  const closeSurveyQuestion = () => {
    setShowSurveyQuestion(false);
  };

  const handlePrev = () => {
    navigate('/survey4');
  };

  const handleNext = () => {
    navigate('/survey6');
  };

  return (
    <>
      {/* 헤더 */}
      <div className="survey-header">
        <img 
          src={vectorIcon} 
          alt="뒤로가기" 
          className="survey-back"
          onClick={handleBack}
        />
        <h1 className="survey-title">강의 기획서 생성하기</h1>
        <img 
          src={questionIcon} 
          alt="도움말" 
          className="survey-help"
          onClick={handleQuestionClick} 
        />
      </div>
      
      <img src={foot5} alt="foot5" className="foot5" />
      <div className="survey1-container">
        <div className="survey1-title">
          내 강의를 들은 사람들이<br />반드시 깨달았으면 하는 것은?
        </div>

        {/* 입력할 수 있는 텍스트 박스 추가 */}
        <textarea 
          className="survey1-input"
          placeholder="예시: 좋은 음식은 마음으로 만드는 거야."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>

      {/* ▼ 버튼 영역: 이전 + 다음 버튼 나란히 배치 */}
      <div className="survey-footer">
        <button className="survey-prev-button" onClick={handlePrev}>
          이전
        </button>
        <button className="survey-next-button2" onClick={handleNext}>
          다음
        </button>
      </div>
    </>
  );
};

export default Survey5;
