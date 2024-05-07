//import React from 'react';
import PropTypes from 'prop-types';
import '../App.css'

const Info = ({ movie }) => {
  return (
    <div className='infoBox'>
      <p className="overview">{movie.overview}</p>
      <div className='overlap'></div>
      <img className='infoImg' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>{movie.release_date}</p>
      <p className='review'>평점: {movie.vote_average} / 10</p>
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