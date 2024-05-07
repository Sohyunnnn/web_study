import Info from '../components/info';
import { nowPlaytingMovies } from '../api/nowPlayingMovies';
import { useEffect, useState } from 'react';


const NowPlayingPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getNowPlayingMovies = async () => {
      try {
        const data = await nowPlaytingMovies();
        setMovies(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    getNowPlayingMovies();
  }, []);

  return (
    <main style={{margin: '30px 0'}}>
      <div className="moviesGrid">
        {movies.map(movie => (
          <div key={movie.id} className="movieItem">
            <Info movie={movie} /> 
          </div>
        ))}
      </div>
    </main>
  );
}

export default NowPlayingPage