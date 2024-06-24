import Info from '../components/info';
import { nowPlayingMovies } from '../api/nowPlayingMovies';
import { useEffect, useState, useCallback } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { styled } from 'styled-components';

const Container= styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
`;

const NowPlayingPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const getNowPlayingMovies = useCallback(async () => {
    if (isFetching) return;
    setIsFetching(true);
    try {
      const data = await nowPlayingMovies(page);
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
      setHasMore(page < data.total_pages);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
      setLoading(false);
    }
  }, [page, isFetching]);

  useEffect(() => {
    getNowPlayingMovies();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      if (!hasMore || isFetching) return;
      setPage((prevPage) => prevPage + 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, isFetching]);

  return (
    <main style={{ margin: '30px auto' }}>
      <Container>
      <div className="moviesGrid">
        {movies.map((movie) => (
          <div key={movie.id} className="movieItem">
            <Info movie={movie} />
          </div>
        ))}
      </div>
      {loading && <LoadingSpinner size={80}/>}
      {!loading&&isFetching && <LoadingSpinner size={50} />}
      </Container>
    </main>
  );
};

export default NowPlayingPage;
