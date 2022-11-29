import React, { useEffect, useContext } from 'react';
import RestaurantFinder from '../api/RestaurantFinder';
import { RestaurantContext } from '../context/RestaurantContext';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';

const RestaurantList = (props) => {
  const { restaurants, setRestaurants } = useContext(RestaurantContext);

  let navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    navigate(`/restaurants/${id}/update`);
  };

  const handleSelectRestaurant = (id) => {
    navigate(`/restaurants/${id}`);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await RestaurantFinder.delete(`/${id}`);
      setRestaurants(
        restaurants.filter((resto) => {
          return resto.id !== id;
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  async function fetchData() {
    try {
      const response = await RestaurantFinder.get('/');
      setRestaurants(response.data.data.restaurant);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="list-group">
      <table className="table table-light table-hover">
        <thead>
          <tr className="table-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((resto, index) => {
              return (
                <tr
                  key={index}
                  onClick={() => handleSelectRestaurant(resto.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{resto.name}</td>
                  <td>{resto.location}</td>
                  <td>{'$'.repeat(resto.price_range)}</td>
                  <td>
                    {resto.review_count ? (
                      <div>
                        <StarRating rating={resto.average_rating} />
                        <span className="text-success ml-1">
                          ({resto.review_count})
                        </span>
                      </div>
                    ) : (
                      <span className="text-warning">0 reviews</span>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleUpdate(e, resto.id)}
                      className="btn btn-warning"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleDelete(e, resto.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
