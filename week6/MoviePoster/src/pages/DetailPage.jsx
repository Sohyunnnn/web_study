import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { IMG_BASE_URL } from '../api/config';
import PropTypes from 'prop-types';
import RatingStars from '../components/RatingStars';
import { getMovieDetails } from '../api/getMovieDetail';
import { getCrew } from '../api/getCrew';

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

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%; /* 50%로 설정하여 이미지를 원형으로 만듭니다. */
  object-fit: cover; /* 이미지가 요소에 맞춰 잘리지 않고 자동으로 조절됩니다. */
  clip-path: circle(50% at center); /* 원형으로 자르도록 설정합니다. */
`;

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));/* 자동으로 열 크기를 조정합니다. 최소 크기는 150px, 최대 크기는 1fr입니다. */
  grid-gap: 10px; /* 그리드 아이템 사이의 간격을 설정합니다. */
  align-items: center; /* 그리드 아이템을 세로로 가운데 정렬합니다. */
`;

const ProfileItem = styled.div`
  text-align: center;
  height:130px;
`;

const EtcContainer =styled.div`
  height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
`;


const DetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [cast, setCast] = useState([]); 
  const [crew, setCrew] = useState([]); 

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);

        const crewData = await getCrew(id);
        setCast(crewData.cast);
        setCrew(crewData.crew);

      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (isLoading) {
    return <EtcContainer>Loading data...</EtcContainer>;
  }
  
  if (error) {
    return <EtcContainer>An error occurred while fetching movie information: {error.message}</EtcContainer>;
  }
  
  if (!movie) {
    return <EtcContainer>Movie information not found.</EtcContainer>;
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
        <div>
        <h2>Cast</h2>
            <ProfileGrid>
              {cast.map(actor => (
                <ProfileItem key={actor.id}>
                  {actor.profile_path ? (
                    <ProfileImg src={`${IMG_BASE_URL}/w200${actor.profile_path}`} alt={actor.name} />
                  ) : (
                    <ProfileImg src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ztleRwzXhFdiwBYqZ8cib9RvEsukVVUS3niN1YQ&s" alt="No Image" />
                  )}
                  <div>{actor.name}</div>
                </ProfileItem>
              ))}
            </ProfileGrid>
            <h2>Crew</h2>
            <ProfileGrid>
              {crew.map(member => (
                <ProfileItem key={member.id}>
                  {member.profile_path ? (
                    <ProfileImg src={`${IMG_BASE_URL}/w200${member.profile_path}`} alt={member.name} />
                  ) : (
                    <ProfileImg src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ztleRwzXhFdiwBYqZ8cib9RvEsukVVUS3niN1YQ&s" alt="No Image" />
                  )}
                  <div>{member.name}</div>
                </ProfileItem>
              ))}
            </ProfileGrid>
        </div>
      </Background>
    </main>
  );
};

Background.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default DetailPage;
