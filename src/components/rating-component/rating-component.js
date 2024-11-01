// RatingComponent.js
import React from 'react';
import PropTypes from 'prop-types';
import { Rate } from 'antd';

const RatingComponent = ({ movieId, movieRatings, onRateChange, count }) => {
  const rating = movieRatings[movieId] || 0; // Если рейтинга нет, то ставим 0 (пустые звезды)
  
  return (
	<Rate value={rating} onChange={(newRating) => onRateChange(movieId, newRating)} count={10} />
  );
};

RatingComponent.propTypes = {
  movieId: PropTypes.number.isRequired,
  movieRatings: PropTypes.object.isRequired,
  onRateChange: PropTypes.func.isRequired,
  count: PropTypes.number,
};

export default RatingComponent;

// import React from 'react';
// import PropTypes from 'prop-types';
// import { Rate } from 'antd';
// 
// const RatingComponent = ({ rating, onRateChange, count }) => (
//   <Rate value={rating} onChange={onRateChange} count={10}  />
// );
// 
// RatingComponent.propTypes = {
//   rating: PropTypes.number,
//   onRateChange: PropTypes.func.isRequired,
// };
// 
// export default RatingComponent;