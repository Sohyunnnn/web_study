import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { searchApi } from '../api/searchApi';
import useDebounce from '../hook/useDebounce';
import Info from '../components/info';

const MainContainer = styled.div`
  display: flex;
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
  display: ${(props) => (props.visible ? 'grid' : 'none')};
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
  overflow-y: auto;
  max-height: 800px;
  background-color: gray;
  width: 1000px;
  margin-bottom: 100px;
`;

const MainPage = () => {
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // debounce 적용
  const debouncedKeyword = useDebounce(keyword, 300);

  // keyword가 변할 때마다 검색 요청
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (debouncedKeyword.trim() !== '') {
        setIsSearching(true);
        try {
          const searchData = await searchApi(debouncedKeyword);
          setSearchResults(searchData.results);
        } catch (error) {
          console.error('Error fetching search results:', error);
        } finally {
          setIsSearching(false);
        }
      }
    };

    fetchSearchResults();
  }, [debouncedKeyword]);

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
        <SearchResultContainer visible={searchResults.length > 0}>
        {searchResults.map((movie) => (
            <div key={movie.id} className="movieItem">
              <Info movie={movie} />
            </div>
          ))}
        </SearchResultContainer>
      </MainContainer>
    </main>
  );
};

export default MainPage;
