import { useLocation } from 'react-router-dom';
import { IMG_BASE_URL } from '../api/config';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import RatingStars from '../components/RatingStars';

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

const Paragraph = styled.p`
  font-size: 20px;
  margin-bottom: 10px; /* 아래쪽 여백 */
`;

const MovieImg = styled.img`
  max-height: 400px;
`;

const Title = styled.p`
  font-size: 35px;
  margin: 0 0 10px 0;
  font-weight: bold;  
`;

const DetailPage = () => {
  const location = useLocation();
  const movie = location.state.movie;

  const roundedRating = Math.floor(movie.vote_average);

  return (
    <main>
      <Background>
        <BackgroundImage imageUrl={`${IMG_BASE_URL}/w500${movie.poster_path}`} />
        <Content>
          <MovieImg src={`${IMG_BASE_URL}/w300${movie.poster_path}`} alt={movie.title} />
          <TextContainer>
            <Title>{movie.title}</Title>
            <Paragraph>Rating: <RatingStars rating={roundedRating} /></Paragraph>
            <Paragraph>Release date: {movie.release_date}</Paragraph>
            <h2>Overview</h2>
            <Paragraph>{movie.overview}</Paragraph>
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
