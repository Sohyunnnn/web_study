import styled from 'styled-components';
import PropTypes from 'prop-types';

const StarRating = styled.div`
  font-size: 24px; 
`;

const RatingStars = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<span key={i}>&#9733;</span>); // 별 아이콘을 추가
  }
  return <StarRating>{stars}</StarRating>; // 별점을 표시
};

RatingStars.propTypes={
  rating: PropTypes.number.isRequired, 
};

export default RatingStars;
