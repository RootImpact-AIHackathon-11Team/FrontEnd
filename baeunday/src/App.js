import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/main';  // Main 페이지 import

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />  {/* 루트 경로('/')에 Main 페이지 연결 */}
      </Routes>
    </Router>
  );
};

export default App;