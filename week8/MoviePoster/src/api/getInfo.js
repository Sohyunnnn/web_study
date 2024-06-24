import { AUTH_URL } from './config';

export const getInfo = async (token) => {
  try {


    const response = await fetch(`${AUTH_URL}auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`

      },
    });

    const data = await response.json();
    console.log(data);
    return data; // 데이터 반환
  } catch (error) {
    console.error(error);
    throw error; // 에러를 다시 던짐
  }
};