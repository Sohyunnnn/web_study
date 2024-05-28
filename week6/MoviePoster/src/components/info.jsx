
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IMG_BASE_URL } from '../api/config';
import { useNavigate } from 'react-router-dom';

const InfoImg = styled.img`
  margin: 20px 0 10px 0;
`;

const Overview = styled.p`
  position: absolute;
  display: none;
  padding: 20px;
  color: white;
  width: 210px;
  z-index: 1;
  font-size: 13px;
  top: 0; /* 부모 요소에 대해 상단으로 고정 */
  left: 0; /* 부모 요소에 대해 왼쪽으로 고정 */
`;

const Overlap = styled.div`
  display: none; 
  background-color: black;
  height: 500px;
  width: 250px;
  opacity: 0.8;
  position: absolute; 
  z-index: 0;
  top: 0; 
  left: 0; 
`;

const Review = styled.p`
  padding: 0 0 10px 0;
`;

const Title = styled.h2`
  font-size: 20px;
  width: 200px;
  margin: 0 auto;
`;

const InfoBox = styled.div`
  background-color: rgb(0, 0, 68);
  width: 250px;
  height: 500px;
  position: relative;
  &:hover {
    ${Overlap}, ${Overview} {
      display: block; /* 호버 상태일 때 나타남 */
    }
  }
`;

const MovieContainer = styled.div`
  cursor: pointer;
`;


const Info = ({ movie }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`,  { state: { movie } });
  };

  return (
    <MovieContainer onClick={handleClick}>
    <InfoBox>
      <Overview>{movie.overview}</Overview>
      <Overlap />
      <InfoImg src={`${IMG_BASE_URL}/w200${movie.poster_path}`} alt={movie.title} />
      <Title>{movie.title}</Title>
      <p>{movie.release_date}</p>
      <Review>평점: {movie.vote_average} / 10</Review>
    </InfoBox>
    </MovieContainer>
  );
};

Info.propTypes = {
  movie: PropTypes.shape({
    poster_path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    vote_count: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};


export default Info;

