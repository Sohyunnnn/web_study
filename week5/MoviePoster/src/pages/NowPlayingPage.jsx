import Info from '../components/info';
import { nowPlaytingMovies } from '../api/nowPlayingMovies';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';


const NowPlayingPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const getNowPlayingMovies = async () => {
      try {
        const data = await nowPlaytingMovies();
        setMovies(data.results);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getNowPlayingMovies();
  }, []);

  return (
    <main style={{margin: '30px auto'}}>
      {loading ? (
       <LoadingSpinner />
      ) : (
        <div className="moviesGrid">
          {movies.map(movie => (
            <div key={movie.id} className="movieItem">
              <Info movie={movie} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default NowPlayingPage