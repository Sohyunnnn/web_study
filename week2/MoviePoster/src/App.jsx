import './App.css'
import Info from '../src/components/info'
import { movies } from '../src/api/movies';

function App() {

  return (
    <>
      {movies.results.map(movie => (
        <Info key={movie.id} movie={movie} /> 
      ))}
    </>
  )
}

export default App
