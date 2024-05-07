
//import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InfoBox = styled.div`
  background-color: rgb(0, 0, 68);
  width: 600px;

  &:hover {
    opacity: 0.2;
  }
`;

const InfoImg = styled.img`
  margin: 50px 0 20px 0;
`;

const Overview = styled.p`
  position: absolute; 
  display: none; 
  padding: 20px; 
  color: white;
  width: 550px;
  z-index: 1;
  padding: 20px;
  font-size: 35px;
`;

const Overlap = styled.div`
  display: none; 
  background-color: black;
  height: 1020px;
  width: 600px;
  opacity: 0.8;
  position: absolute; 
  z-index: 0;
`;

const Review = styled.p`
  padding: 0 0 30px 0;
`;

const Title = styled.h2`
  font-size: 30px;
`;

const Info = ({ movie }) => {
  return (
    <InfoBox>
      <Overview>{movie.overview}</Overview>
      <Overlap />
      <InfoImg src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
      <Title>{movie.title}</Title>
      <p>{movie.release_date}</p>
      <Review>평점: {movie.vote_average} / 10</Review>
    </InfoBox>
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
  }).isRequired,
};


export default Info;

