//import React from 'react';
import PropTypes from 'prop-types';

const Info = ({ movie }) => {
  return (
    <div className='infoBox'>
      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>{movie.release_date}</p>
      <p>{movie.overview}</p>
      <p>평점: {movie.vote_average} / 10</p>
      <p>평가 수: {movie.vote_count}</p>
    </div>
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
