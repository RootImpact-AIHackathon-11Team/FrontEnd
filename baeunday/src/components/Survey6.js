import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Survey6.css';
import vectorIcon from '../assets/images/Vector.svg';
import questionIcon from '../assets/images/question.svg';
import SurveyQuestion from '../components/survey_question';
import foot6 from '../assets/images/foot6.png';

const Survey6 = () => {
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
    navigate('/survey5');
  };

  const handleNext = () => {
    navigate('/survey7');
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
      
      <img src={foot6} alt="foot6" className="foot6" />
      <div className="survey1-container">
        <div className="survey1-title">
          이 강의를 듣지 않는다면,<br />수강생들은 어떤 기회를 놓치게 될까요??
        </div>

        {/* 입력할 수 있는 텍스트 박스 추가 */}
        <textarea 
          className="survey1-input"
          placeholder="예시: 직접 만든 두부 맛은 못 보겠지."
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

export default Survey6;
