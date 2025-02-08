import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/main';
import LectureDetailPage from './pages/LectureDetailPage';
import Loading from './pages/loading';
import NotLogin from './pages/notlogin';
import Login from './pages/login';
import Signup from './pages/signup';
import Mypage from './pages/mypage';
import ProfileEdit from './components/ProfileEdit';
import NicknameEdit from './components/NicknameEdit';
import ReviewPage from './components/ReviewPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/notlogin" element={<NotLogin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/lecture/:lectureId" element={<LectureDetailPage />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/mypage/review" element={<ReviewPage />} />
        <Route path="/profile/edit" element={<ProfileEdit />} />
        <Route path="/profile/nickname" element={<NicknameEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
