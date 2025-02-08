import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/main';
import LectureDetailPage from './components/LectureDetailPage';
import Loading from './pages/loading';
import NotLogin from './pages/notlogin';
import Login from './pages/login';
import Signup from './pages/signup';
import InquiryPage from './pages/InquiryPage';

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
        <Route 
          path="/lecture/:lectureId/inquiries" 
          element={<InquiryPage />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
