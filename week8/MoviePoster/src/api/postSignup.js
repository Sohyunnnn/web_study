import { AUTH_URL } from './config';

export const postSignup = async (userData) => {
  try {
    const response = await fetch(`${AUTH_URL}auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();
    console.log(data);
    return data; // 데이터 반환
  } catch (error) {
    console.error(error);
    throw error; // 에러를 다시 던짐
  }
};
