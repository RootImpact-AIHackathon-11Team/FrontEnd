import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/main';
import LectureDetailPage from './pages/LectureDetailPage';
import Loading from './pages/loading';
import NotLogin from './pages/notlogin';
import Login from './pages/login';
import Signup from './pages/signup';
import Mypage from './pages/mypage';
import Reviews from './pages/Reviews';
import ProfileEdit from './components/ProfileEdit';

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
        <Route path="/reviews" element={<Reviews/>}/>
        <Route path="/profileedit" element={<ProfileEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
