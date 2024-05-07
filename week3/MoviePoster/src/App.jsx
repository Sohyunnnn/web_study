import './App.css'
import Info from '../src/components/info'
import { movies } from '../src/api/movies';

function App() {

  return (
    <>
       <div className="moviesGrid">
        {movies.results.map(movie => (
        <div key={movie.id} className="movieItem">
          <Info movie={movie} /> 
        </div>
    ))}
  </div>
    </>
  )
}

export default App
