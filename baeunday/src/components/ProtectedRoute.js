import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    // 토큰이 없으면 알림을 보여주고 not-login 페이지로 리다이렉트
    alert("로그인이 필요합니다.");
    return <Navigate to="/not-login" replace />;
  }

  return children;
};

export default ProtectedRoute; 