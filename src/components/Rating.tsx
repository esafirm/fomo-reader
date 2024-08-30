import React from 'react';

type RatingProps = {
  rating: number;
};

export default function Rating(props: RatingProps) {
  const maxRating = 5;
  const stars = [];

  for (let i = 1; i <= maxRating; i++) {
    if (i <= props.rating) {
      stars.push(<span key={i}>&#9733;</span>); // Filled star
    } else {
      stars.push(<span key={i}>&#9734;</span>); // Empty star
    }
  }

  return (
    <div className="flex">
      <div>{stars}</div>
      <div className="ml-2">{`${props.rating}/${maxRating}`}</div>
    </div>
  );
}