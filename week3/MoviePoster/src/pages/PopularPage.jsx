import Info from '../components/info';
import { fetchMovies } from '../api/movies';
import { useEffect, useState } from 'react';

const PopularPage = () => {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const data = await fetchMovies();
        setMovies(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieData();
  }, []);

  return (
    <main>
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

export default PopularPage;