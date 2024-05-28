import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { IMG_BASE_URL } from '../api/config';
import PropTypes from 'prop-types';
import RatingStars from '../components/RatingStars';
import { getMovieDetails } from '../api/getMovieDetail';

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
  text-align: left;
`;

const Paragraph = styled.p`
  font-size: 20px;
  margin-bottom: 10px;
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
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(id);
        console.log(id)
        console.log('data',data)
        setMovie(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (isLoading) {
    return <div>데이터를 받아오는 중입니다...</div>;
  }

  if (error) {
    return <div>영화 정보를 가져오는 중 오류가 발생했습니다: {error.message}</div>;
  }

  if (!movie) {
    return <div>영화 정보를 찾을 수 없습니다.</div>;
  }

  const roundedRating = Math.floor(movie.vote_average);

  return (
    <main>
      <Background>
        <BackgroundImage imageUrl={`${IMG_BASE_URL}/w500${movie.poster_path}`} />
        <Content>
          <MovieImg src={`${IMG_BASE_URL}/w300${movie.poster_path}`} alt={movie.title} />
          <TextContainer>
            <Title>{movie.title}</Title>
            <h2>Rating</h2>
            <RatingStars rating={roundedRating} />
            <h2>Release date</h2>
            <Paragraph>{movie.release_date}</Paragraph>
            <h2>Overview</h2>
            <Paragraph>
              {movie.overview ? movie.overview : "No overview available."}
            </Paragraph>
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
