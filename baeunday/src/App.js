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
import LectureRegister from './pages/LectureRegister';
import LectureGuideModal from './components/LectureGuideModal';
import LecturePreview from './pages/LecturePreview';
import ReviewForm from './pages/ReviewForm';
import ProtectedRoute from './components/ProtectedRoute';

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
        <Route path="/lectureregister" element={<ProtectedRoute><LectureRegister /></ProtectedRoute>} />
        <Route path="/lecture-guide" element={<ProtectedRoute><LectureGuideModal /></ProtectedRoute>} />
        <Route path="/lecturepreview" element={<ProtectedRoute><LecturePreview /></ProtectedRoute>} />
        <Route path="/mainpage" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
        <Route path="/review" element={<ProtectedRoute><ReviewForm /></ProtectedRoute>} />
        <Route path="/reviewpage" element={<ProtectedRoute><ReviewPage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;