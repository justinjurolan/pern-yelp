import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../api/RestaurantFinder';

const AddReview = ({ newReview, setNewReview }) => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    try {
      const addReviewResults = await RestaurantFinder.post(
        `/${id}/add-review`,
        {
          id,
          name,
          review,
          rating: rating,
        }
      );
      setNewReview(!newReview);
      setName('');
      setReview('');
      setRating('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mb-2 mt-4">
      <form action="">
        <div className="form-row">
          <div className="form-group col-4 mb-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group col-4 mb-2">
            <label htmlFor="rating">Rating</label>
            <select
              className="form-select"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option defaultValue>Select Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group col-5 mb-2">
          <label>Reviews</label>
          <textarea
            className="form-control"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          onClick={handleSubmitReview}
          className="btn btn-success"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddReview;
