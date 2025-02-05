import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/main';
import LectureDetailPage from './pages/LectureDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/lecture/:lectureId" element={<LectureDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
