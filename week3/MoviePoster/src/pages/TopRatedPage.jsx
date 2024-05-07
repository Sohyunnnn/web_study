import Info from '../components/info';
import { topRatedMovies } from '../api/topRatedMovies';
import { useEffect, useState } from 'react';

const TopRatedPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getTopRatedMovies = async () => {
      try {
        const data = await topRatedMovies();
        setMovies(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    getTopRatedMovies();
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

export default TopRatedPage