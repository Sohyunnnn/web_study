import { API_URL } from './config';
import { API_KEY } from './key';

export const getCrew = async (id) => {
  try {
    const response = await fetch(`${API_URL}movie/${id}/credits?api_key=${API_KEY}`);
    const data = await response.json(); 
    return data; // 추출된 데이터 반환
  } catch (error) {
    console.error(error);
    throw error; // 에러를 다시 던짐
  }
};

