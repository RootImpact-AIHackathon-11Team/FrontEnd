import React, { useState } from 'react';
import { login } from '../utils/auth';

const LoginForm = ({ onLoginSuccess, onLoginError }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await login(username, password);
    if (result.success) {
      onLoginSuccess(result.token);
    } else {
      onLoginError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="아이디"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? '로그인 중...' : '로그인'}
      </button>
    </form>
  );
};

export default LoginForm; 