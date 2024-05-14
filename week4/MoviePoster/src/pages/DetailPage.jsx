import { useLocation } from 'react-router-dom';
import { IMG_BASE_URL } from '../api/config';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Background = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
`;

const BackgroundImage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  opacity: 0.2;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: row;
  padding: 100px 200px;
  gap: 100px;
`;

const TextContainer = styled.div`
  text-align: left; /* 텍스트를 시작점으로 정렬 */
`;


const DetailPage = () => {
  const location = useLocation();
  const movie = location.state.movie;

  return (
    <main>
      <Background>
        <BackgroundImage imageUrl={`${IMG_BASE_URL}/w500${movie.poster_path}`} />
        <Content>
          <img src={`${IMG_BASE_URL}/w300${movie.poster_path}`} alt={movie.title} />
          <TextContainer>
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
          </TextContainer>
        </Content>
      </Background>
    </main>
  );
};


Background.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default DetailPage;
