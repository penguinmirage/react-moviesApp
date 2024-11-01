
import React from 'react';
import PropTypes from 'prop-types';
import { Rate } from 'antd';

const RatingComponent = ({ movieId, movieRatings, onRateChange, count }) => {
  const rating = movieRatings[movieId] || 0; 
  
  return (
	<Rate value={rating} onChange={(newRating) => onRateChange(movieId, newRating)} count={8} />
  );
};

RatingComponent.propTypes = {
  movieId: PropTypes.number.isRequired,
  movieRatings: PropTypes.object.isRequired,
  onRateChange: PropTypes.func.isRequired,
  count: PropTypes.number,
};

export default RatingComponent;

