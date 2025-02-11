import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import DescriptionEdit from './components/DescriptionEdit';
import LectureRegister from './pages/LectureRegister';
import LectureGuideModal from './components/LectureGuideModal';
import LecturePreview from './pages/LecturePreview';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/not-login" element={<NotLogin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/lecture/:lectureId" element={<LectureDetailPage />} />
        <Route path="/lecture/:lectureId/inquiries" element={<InquiryPage />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/mypage/review" element={<ReviewPage />} />
        <Route path="/profile/edit" element={<ProfileEdit />} />
        <Route path="/profile/nickname" element={<NicknameEdit />} />
        <Route path="/profile/description" element={<DescriptionEdit />} />
        <Route path="/lectureregister" element={<LectureRegister />} />
        <Route path="/lecture-guide" element={<LectureGuideModal />} />
        <Route path="/lecturepreview" element={<LecturePreview />} />
      </Routes>
    </Router>
  );
}

export default App;
