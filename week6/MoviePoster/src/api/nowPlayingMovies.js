import { API_URL } from './config';
import { API_KEY } from './key';

export const nowPlaytingMovies = async () => {
  try {
    const response = await fetch(`${API_URL}movie/now_playing?api_key=${API_KEY}`);
    const data = await response.json();
    console.log(data);
    return data; // 데이터 반환
  } catch (error) {
    console.error(error);
    throw error; // 에러를 다시 던짐
  }
};
