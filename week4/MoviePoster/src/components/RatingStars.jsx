// import styled from 'styled-components';
// import PropTypes from 'prop-types';

// const StarRating = styled.div`
//   font-size: 24px; 
// `;

// const RatingStars = ({ rating }) => {
//   const stars = [];
//   for (let i = 0; i < rating; i++) {
//     stars.push(<span key={i}>&#9733;</span>); // 별 아이콘을 추가
//   }
//   return <StarRating>{stars}</StarRating>; // 별점을 표시
// };

// RatingStars.propTypes={
//   rating: PropTypes.number.isRequired, 
// };

// export default RatingStars;


import styled from 'styled-components';
import PropTypes from 'prop-types';

// Styled component for the star container
const StarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  width: 300px;
`;

// Styled component for each star item
const StarItem = styled.div`
  /* Style each star item here */
`;

// StarRating component
const StarRating = ({ rating }) => {
  // Generate an array of star items based on the rating
  const stars = Array.from({ length: 10 }, (_, index) => (
    <StarItem key={index}>{index < rating ? '★' : '☆'}</StarItem>
  ));

  return <StarContainer>{stars}</StarContainer>;
};

// PropTypes for StarRating component
StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default StarRating;

