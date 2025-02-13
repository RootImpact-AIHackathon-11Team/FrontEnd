import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Survey7.css';
import vectorIcon from '../assets/images/Vector.svg';
import questionIcon from '../assets/images/question.svg';
import SurveyQuestion from '../components/survey_question';
import foot7 from '../assets/images/foot7.png';

const Survey7 = () => {
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
    navigate('/survey6');
  };

  const handleNext = () => {
    navigate('/survey8');
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
      
      <img src={foot7} alt="foot7" className="foot7" />
      <div className="survey1-container">
        <div className="survey1-title">
          내 이야기를 들은 사람들이<br />'와, 이거다!'라고 느끼게 하고 싶은 부분은?
        </div>

        {/* 입력할 수 있는 텍스트 박스 추가 */}
        <textarea 
          className="survey1-input"
          placeholder="예시: 다 어렵지 않더라. 천천히, 정성껏 하면돼."
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

export default Survey7;
