import Info from '../components/info';
import { fetchMovies } from '../api/movies';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

const PopularPage = () => {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const data = await fetchMovies();
        setMovies(data.results);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieData();
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

export default PopularPage;