import Info from '../components/info';
import { fetchMovies } from '../api/movies';
import { useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';



const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  width: 35px;
  height: 35px;
  margin: 0 5px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  background-color: ${(props) => (props.disabled ? '#ccc' : '#007BFF')};
  color: ${(props) => (props.disabled ? '#666' : '#fff')};
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CurrentPage = styled.div`
  font-size: 18px;
  margin: 0 10px;
`;

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <PaginationContainer>
      <PageButton disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        &lt;
      </PageButton>
      <CurrentPage>{currentPage}</CurrentPage>
      <PageButton disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        &gt;
      </PageButton>
    </PaginationContainer>
  );
};

const PopularPage = () => {
  // const [movies, setMovies] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);


  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ['movies', currentPage],
    queryFn: () => fetchMovies(currentPage),
    keepPreviousData: true,
  });

  const totalPages = data?.total_pages || 1;

  // useEffect(() => {
  //   const fetchMovieData = async (page) => {
  //     try {
  //       setLoading(true);
  //       const data = await fetchMovies(page);
  //       setMovies(data.results);
  //       setTotalPages(data.total_pages);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error(error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchMovieData(currentPage);
  // }, [currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

    if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error loading movies</div>;
  }

  

  return (
    <main style={{ margin: '30px auto' }}>
        <div>
          <div className="moviesGrid">
            {data.results.map((movie) => (
              <div key={movie.id} className="movieItem">
                <Info movie={movie} />
              </div>
            ))}
          </div>
          <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
          {isFetching && <LoadingSpinner />}
        </div>
    </main>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};



export default PopularPage;
