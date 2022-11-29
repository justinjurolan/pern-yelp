import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RestaurantFinder from '../api/RestaurantFinder';

const UpdateRestaurant = (props) => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState(0);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        setName(response.data.data.restaurant.name);
        setLocation(response.data.data.restaurant.location);
        setPriceRange(response.data.data.restaurant.price_range);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
        name,
        location,
        price_range: priceRange,
      });
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <form action="">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            value={name}
            type="text"
            id="name"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            value={location}
            type="text"
            id="location"
            onChange={(e) => setLocation(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price Range</label>
          <input
            value={priceRange}
            type="number"
            id="price_range"
            onChange={(e) => setPriceRange(e.target.value)}
            className="form-control"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-success btn-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateRestaurant;
