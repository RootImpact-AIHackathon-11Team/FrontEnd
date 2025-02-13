import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './pages/main';
import LectureDetailPage from './components/LectureDetailPage';
import Loading from './pages/loading';
import NotLogin from './pages/notlogin';
import Login from './pages/login';
import Signup from './pages/signup';
import Mypage from './pages/mypage';
import ProfileEdit from './components/ProfileEdit';
import NicknameEdit from './components/NicknameEdit';
import ReviewPage from './components/ReviewPage';
import InquiryPage from './pages/InquiryPage';
import AppliedPage from './pages/AppliedPage';
import WishlistPage from './pages/WishlistPage';
import RegisteredLecturePage from './pages/RegisteredLecturePage';
import DescriptionEdit from './components/DescriptionEdit';
import LecturePreview from './pages/LecturePreview';
import ReviewForm from './pages/ReviewForm';
import ProtectedRoute from './components/ProtectedRoute';
import Survey from './pages/Survey';
import SurveyQuestion from './components/survey_question'; 
import Survey1 from './components/Survey1';
import Survey2 from './components/Survey2';
import Survey3 from './components/Survey3';
import Survey4 from './components/Survey4';
import Survey5 from './components/Survey5';
import Survey6 from './components/Survey6';
import Survey7 from './components/Survey7';
import Survey8 from './components/Survey8';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/loading" replace />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/not-login" element={<NotLogin />} />
        <Route path="/main" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
        <Route path="/lecture/:lectureId" element={<ProtectedRoute><LectureDetailPage /></ProtectedRoute>} />
        <Route path="/lecture/:lectureId/inquiries" element={<ProtectedRoute><InquiryPage /></ProtectedRoute>} />
        <Route path="/mypage" element={<ProtectedRoute><Mypage /></ProtectedRoute>} />
        <Route path="/mypage/review" element={<ProtectedRoute><ReviewPage /></ProtectedRoute>} />
        <Route path="/profile/edit" element={<ProtectedRoute><ProfileEdit /></ProtectedRoute>} />
        <Route path="/profile/nickname" element={<ProtectedRoute><NicknameEdit /></ProtectedRoute>} />
        <Route path="/applied" element={<ProtectedRoute><AppliedPage /></ProtectedRoute>} />
        <Route path="/wishlist" element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />
        <Route path="/registered" element={<ProtectedRoute><RegisteredLecturePage /></ProtectedRoute>} />
        <Route path="/profile/description" element={<ProtectedRoute><DescriptionEdit /></ProtectedRoute>} />
        <Route path="/lecturepreview" element={<ProtectedRoute><LecturePreview /></ProtectedRoute>} />
        <Route path="/mainpage" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
        <Route path="/reviewform" element={<ProtectedRoute><ReviewForm /></ProtectedRoute>} />
        <Route path="/reviewpage" element={<ProtectedRoute><ReviewPage /></ProtectedRoute>} />
        <Route path="/survey" element={<ProtectedRoute><Survey /></ProtectedRoute>} />
        <Route path="/surveyquestion" element={<ProtectedRoute><SurveyQuestion /></ProtectedRoute>} /> 
        <Route path="/survey1" element={<ProtectedRoute><Survey1 /></ProtectedRoute>} />
        <Route path="/survey2" element={<ProtectedRoute><Survey2 /></ProtectedRoute>} />
        <Route path="/survey3" element={<ProtectedRoute><Survey3 /></ProtectedRoute>} />
        <Route path="/survey4" element={<ProtectedRoute><Survey4 /></ProtectedRoute>} />
        <Route path="/survey5" element={<ProtectedRoute><Survey5 /></ProtectedRoute>} />
        <Route path="/survey6" element={<ProtectedRoute><Survey6 /></ProtectedRoute>} />
        <Route path="/survey7" element={<ProtectedRoute><Survey7 /></ProtectedRoute>} />
        <Route path="/survey8" element={<ProtectedRoute><Survey8 /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
