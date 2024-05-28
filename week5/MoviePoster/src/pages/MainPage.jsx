

import { useState } from 'react';
import styled from 'styled-components';
import { searchApi } from '../api/searchApi';
import { IMG_BASE_URL } from '../api/config';

const MainContainer = styled.div`
  display:flex;
  flex-direction: column;
  width: 100%;
  align-items: center; 
  justify-content: center;
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
  overflow-y: auto; /* 수직 스크롤바를 표시하기 위해 추가 */
  max-height: 800px; /* 최대 높이를 지정하여 스크롤바가 나타나도록 설정 */
  background-color: gray;
  width: 1000px;
  margin-bottom:100px;
`;


const MovieItem = styled.div`
  background-color: rgb(0, 0, 68);;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: white;
  padding-top: 20px;
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
        setIsSearching(false);
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
          {searchResults.map((movie) => (
            <MovieItem key={movie.id}>
              <img src={`${IMG_BASE_URL}/w200${movie.poster_path}`} alt={movie.title} />
              <p>{movie.title}</p>
              <p>{movie.vote_average}</p>
            </MovieItem>
          ))}
          </SearchResultContainer>
      </MainContainer>
    </main>
  );
};

export default MainPage;
