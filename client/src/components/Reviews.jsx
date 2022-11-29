import React from 'react';
import StarRating from './StarRating';

const Reviews = ({ reviews }) => {
  return (
    <div className="row">
      {reviews && reviews.length <= 0 ? (
        <div>
          <h1>No reviews yet...</h1>
          <h2>Add a review! 🙂</h2>
        </div>
      ) : (
        ''
      )}
      {reviews &&
        reviews.map((review) => {
          return (
            <div className="col-sm-6" key={review.id}>
              <div className="card mt-3">
                <div className="card-body">
                  <div>
                    <h5 className="card-title">{review.name}</h5>
                    <p className="card-text">{review.review}</p>
                    <StarRating rating={review.rating} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Reviews;
