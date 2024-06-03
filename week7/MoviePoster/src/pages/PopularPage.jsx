import Info from '../components/info';
import { fetchMovies } from '../api/movies';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import styled from 'styled-components';
import PropTypes from 'prop-types';


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
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovieData = async (page) => {
      try {
        setLoading(true);
        const data = await fetchMovies(page);
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchMovieData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <main style={{ margin: '30px auto' }}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className="moviesGrid">
            {movies.map((movie) => (
              <div key={movie.id} className="movieItem">
                <Info movie={movie} />
              </div>
            ))}
          </div>
          <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
      )}
    </main>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};



export default PopularPage;
