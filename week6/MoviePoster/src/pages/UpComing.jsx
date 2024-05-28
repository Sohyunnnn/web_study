import Info from '../components/info';
import { upcomingMovies } from '../api/upcomingMovies';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

const UpComing = () => {
  const [movies, setMovies]= useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(()=> {
    const getUpcomingMovies = async ()=>{
      try{
        const data= await upcomingMovies();
        setMovies(data.results);
        setLoading(false);
      }catch(error){
        console.log(error);
      }
    };
    getUpcomingMovies();
  },[]);

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

export default UpComing;
