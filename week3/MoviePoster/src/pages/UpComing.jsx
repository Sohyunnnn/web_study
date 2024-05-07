import Info from '../components/info';
import { upcomingMovies } from '../api/upcomingMovies';
import { useEffect, useState } from 'react';

const UpComing = () => {

  const [movies, setMovies]= useState([]);

  useEffect(()=> {
    const getUpcomingMovies = async ()=>{
      try{
        const data= await upcomingMovies();
        setMovies(data.results);
      }catch(error){
        console.log(error);
      }
    };
    getUpcomingMovies();
  },[]);
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
  )
}

export default UpComing