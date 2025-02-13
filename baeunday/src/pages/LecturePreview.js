import React, { useState, useEffect } from 'react';
import '../css/LecturePreview.css';
import { ReactComponent as BackIcon } from '../assets/images/Vector.svg';
import { ReactComponent as PosterIcon } from '../assets/images/poster.svg';
import { ReactComponent as PaintIcon } from '../assets/images/paint-icon.svg';
import exclamationIcon from '../assets/images/느낌표.svg';

function LecturePreview() {
    const [lectureInfo, setLectureInfo] = useState({
        lectureName: "홈베이킹 기초 클래스",
        lectureName1: "2025.02.12",
        lectureName2: "2024.12.02 00:00 - 2024.12.30 17:00",
        lectureName3: "₩  100,000",
        lectureName4: "어벤더치커피 구미금오공대점",
        lectureTopic: "홈베이킹 기초 클래스",
        lectureInfo: "홈베이킹 기초 클래스",
        image: null,
        errors: {
            lectureName: false,
            lectureName1: false,
            lectureName2: false,
            lectureName3: false,
            lectureName4: false,
            lectureTopic: false,
            lectureInfo: false,
            image: false
        }
    });

    useEffect(() => {
        async function fetchLectureData() {
            try {
                const response = await fetch('API_ENDPOINT_URL');
                const data = await response.json();
                setLectureInfo(prev => ({
                    ...prev,
                    lectureName: data.info.title,
                    lectureTopic: data.info.subject
                }));
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        }
        fetchLectureData();
    }, []);

    const handleChange = (field, value) => {
        setLectureInfo(prev => ({
            ...prev,
            [field]: value,
            errors: { ...prev.errors, [field]: false }
        }));
    };

    const handleImageChange = (event) => {
        setLectureInfo(prev => ({
            ...prev,
            image: event.target.files[0] || null,
            errors: { ...prev.errors, image: false }
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = {
            lectureName: !lectureInfo.lectureName.trim(),
            lectureName1: !lectureInfo.lectureName1.trim(),
            lectureName2: !lectureInfo.lectureName2.trim(),
            lectureName3: !lectureInfo.lectureName3.trim(),
            lectureName4: !lectureInfo.lectureName4.trim(),
            lectureTopic: !lectureInfo.lectureTopic.trim(),
            lectureInfo: !lectureInfo.lectureInfo.trim(),
            image: !lectureInfo.image
        };

        setLectureInfo(prev => ({ ...prev, errors }));

        if (!Object.values(errors).includes(true)) {
            console.log("Form submitted", lectureInfo);
        }
    };

    return (
        <>
        <header className="lecturepreview-header">
            <button className="lecturepreview-back-button">
                <BackIcon />
            </button>
            <div className="lecturepreview-title">강의 기획서 등록하기</div>
        </header>
        <div className="lecturepreview-card">
            <div className="lecturepreview-icon-wrapper" style={{ position: 'absolute', top: '105px', left: '10px' }}>
                <PosterIcon className="lecturepreview-poster-icon">
                    <PaintIcon className="lecturepreview-paint-icon" />
                </PosterIcon>
            </div>
            <div className="lecturepreview-content">
                <div className="lecturepreview-subtitle">
                    <span className="lecturepreview-main-subtitle">컴공사이에피어난전쟁통</span>
                    <span className="lecturepreview-suffix">님</span>
                </div>
                <p className="lecturepreview-description">강의 기획서를 작성해 주세요</p>
                <div className="lecture-inputs-container">
                    {/* 강의주제 */}
                    <div className="lecture-topic-container">
                        <div className="lecture-label">강의주제<span className="important-star">*</span></div>
                    </div>

                    {/* 강의명 */}
                    <div className="lecture-name-container">
                        <label className="lecture-name-label">강의명</label>
                        <input type="text" className={`lecture-name-input ${lectureInfo.errors.lectureName ? 'input-error' : ''}`} value={lectureInfo.lectureName} onChange={(e) => handleChange('lectureName', e.target.value)} />
                        {lectureInfo.errors.lectureName && <div className="error-message">필수 입력 항목입니다.</div>}
                    </div>

                    {/* 강의정보 */}
                    <div className="lecture-info-container">
                        <div className="lecture-label">강의정보<span className="important-star">*</span></div>
                    </div>

                    {/* 일시 */}
                    <div className="lecture-name-container">
                        <label className="lecture-name-label">일시</label>
                        <input type="text" className={`lecture-name-input ${lectureInfo.errors.lectureName1 ? 'input-error' : ''}`} value={lectureInfo.lectureName1} onChange={(e) => handleChange('lectureName1', e.target.value)} />
                        {lectureInfo.errors.lectureName1 && <div className="error-message">필수 입력 항목입니다.</div>}
                    </div>

                    {/* 신청 */}
                    <div className="lecture-name-container">
                        <label className="lecture-name-label">신청</label>
                        <input type="text" className={`lecture-name-input ${lectureInfo.errors.lectureName2 ? 'input-error' : ''}`} value={lectureInfo.lectureName2} onChange={(e) => handleChange('lectureName2', e.target.value)} />
                        {lectureInfo.errors.lectureName2 && <div className="error-message">필수 입력 항목입니다.</div>}
                    </div>

                    {/* 비용 */}
                    <div className="lecture-name-container">
                        <label className="lecture-name-label">비용</label>
                        <input type="text" className={`lecture-name-input ${lectureInfo.errors.lectureName3 ? 'input-error' : ''}`} value={lectureInfo.lectureName3} onChange={(e) => handleChange('lectureName3', e.target.value)} />
                        {lectureInfo.errors.lectureName3 && <div className="error-message">필수 입력 항목입니다.</div>}
                    </div>

                    {/* 장소 */}
                    <div className="lecture-name-container">
                        <label className="lecture-name-label">장소</label>
                        <input type="text" className={`lecture-name-input ${lectureInfo.errors.lectureName4 ? 'input-error' : ''}`} value={lectureInfo.lectureName4} onChange={(e) => handleChange('lectureName4', e.target.value)} />
                        {lectureInfo.errors.lectureName4 && <div className="error-message">필수 입력 항목입니다.</div>}
                    </div>

                    {/* 제출 버튼 */}
                    <div className="lecture-preview-button-container">
                        <button className="lecture-preview-button" onClick={handleSubmit}>
                            등록하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default LecturePreview;
