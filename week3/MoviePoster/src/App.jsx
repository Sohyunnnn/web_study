import './App.css'
import Info from '../src/components/info'
import { fetchMovies } from '../src/api/movies';
import { useEffect, useState } from 'react';

function App() {
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
    <div className="moviesGrid">
      {movies.map(movie => (
        <div key={movie.id} className="movieItem">
          <Info movie={movie} /> 
        </div>
      ))}
    </div>
  );
}


export default App
