import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../api/RestaurantFinder';
import { RestaurantContext } from '../context/RestaurantContext';
import StarRating from '../components/StarRating';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';

const RestaurantDetail = () => {
  const { id } = useParams();
  const [newReview, setNewReview] = useState(false);
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantContext);

  useEffect(() => {
    fetchData();
  }, [newReview]);

  const fetchData = async () => {
    try {
      const fetchRestaurant = await RestaurantFinder.get(`/${id} `);
      setSelectedRestaurant(fetchRestaurant.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-center mt-5 display-1">
        {selectedRestaurant && selectedRestaurant.restaurant.name}
      </h1>
      {selectedRestaurant && selectedRestaurant.restaurant.review_count ? (
        <div className="text-center">
          <StarRating
            rating={
              selectedRestaurant && selectedRestaurant.restaurant.average_rating
            }
          />
          <span>
            ({selectedRestaurant && selectedRestaurant.restaurant.review_count})
          </span>
        </div>
      ) : (
        ''
      )}
      <div className="mt-3">
        <Reviews reviews={selectedRestaurant && selectedRestaurant.reviews} />
      </div>
      <div>
        <AddReview newReview={newReview} setNewReview={setNewReview} />
      </div>
    </div>
  );
};

export default RestaurantDetail;
