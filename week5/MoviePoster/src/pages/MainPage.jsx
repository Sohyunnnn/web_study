import { useState } from 'react';
import styled from 'styled-components';
import { searchApi } from '../api/searchApi';

const MainContainer = styled.div`
  display:flex;
  flex-direction: column;
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
  margin-bottom: 100px;
`;

const InputBox = styled.input`
  width: 250px;
`;

const SearchButton = styled.button`
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  background-color: ${(props) => (props.disabled ? '#ccc' : '#007BFF')};
  color: ${(props) => (props.disabled ? '#666' : '#fff')};
  border: none;
  width: 80px;
`;

const SearchResultContainer = styled.div`
  max-height: 300px;
  overflow-y: auto;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const MovieItem = styled.div`
  margin-bottom: 10px;
`;

const MainPage = () => {
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = async () => {
    if (keyword.trim() !== '') {
      setIsSearching(true);
      try {
        const searchData = await searchApi(keyword);
        setSearchResults(searchData.results);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setIsSearching(false); // 검색 완료 후 상태 업데이트
      }
    }
  };

  return (
    <main>
      <MainContainer>
        <h2>Find your movies!</h2>
        <InputContainer>
          <InputBox
            placeholder="Enter keyword..."
            value={keyword}
            onChange={handleInputChange}
          />
          <SearchButton
            onClick={handleSearch}
            disabled={keyword.trim() === '' || isSearching}
          >
            Search
          </SearchButton>
        </InputContainer>
        <SearchResultContainer>
          {isSearching && searchResults.length === 0 && <div>No results found</div>}
          {isSearching &&
            searchResults.map((movie) => (
              <MovieItem key={movie.id}>
                <p>{movie.title}</p>
                <p>{movie.overview}</p>
              </MovieItem>
            ))}
        </SearchResultContainer>
      </MainContainer>
    </main>
  );
};

export default MainPage;
