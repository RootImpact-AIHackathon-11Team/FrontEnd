import axios from 'axios';

const BASE_URL = 'http://43.202.15.40';

export const autoLogin = async () => {
  try {
    console.log('자동 로그인 시도 중...');
    const loginResponse = await axios.post(`${BASE_URL}/user/login`, 
      {
        "username": "baeunday",
        "password": "1234"
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    
    console.log('로그인 응답:', loginResponse);
    
    if (loginResponse.data.status === 200) {
      const token = loginResponse.headers.authorization?.replace('Bearer ', '');
      console.log('받은 토큰:', token);
      if (token) {
        localStorage.setItem('token', token);
        return { success: true, token };
      }
      throw new Error('토큰이 없습니다.');
    }
    throw new Error(loginResponse.data.message || '로그인에 실패했습니다.');
  } catch (error) {
    console.error('Login error details:', {
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers,
      message: error.message
    });
    return { 
      success: false, 
      error: error.response?.data?.message || '로그인에 실패했습니다.' 
    };
  }
};

export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const logout = () => {
  localStorage.removeItem('token');
}; 