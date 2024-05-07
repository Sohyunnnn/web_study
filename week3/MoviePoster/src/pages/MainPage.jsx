import Banner from '../components/home/Banner';
import styled from 'styled-components';

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


const MainPage = () => {
  return (
    <main>
      <MainContainer>
      <Banner />
      <h2>Find your movies!</h2>
      <InputContainer>
      <input style={{width:'250px'}} />
      <button>search</button>
      </InputContainer>
      </MainContainer>
    </main>
  )
}

export default MainPage