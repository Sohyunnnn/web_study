import Info from '../components/info';
import { topRatedMovies } from '../api/topRatedMovies';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

const TopRatedPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const getTopRatedMovies = async () => {
      try {
        const data = await topRatedMovies();
        setMovies(data.results);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getTopRatedMovies();
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

export default TopRatedPage