require('dotenv').config();
const { query } = require('express');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./db/index');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//app.use(express.static(path.join(__dirname, 'client/dist')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/dist')));
}

// Get all restaurants
app.get('/api/v1/restaurants', async (req, res) => {
  try {
    const restaurantRatingData = await db.query(
      'select * from restaurants left join (select restaurant_id, COUNT(*) as review_count, TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;'
    );
    res.status(200).json({
      status: 'success',
      results: restaurantRatingData.rowCount,
      data: {
        restaurant: restaurantRatingData.rows,
      },
    });
  } catch (error) {
    console.error(error);
  }
});

// Get single restaurant
app.get('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const results = await db.query(
      'select * from restaurants left join (select restaurant_id, COUNT(*) as review_count, TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1;',
      [restaurantId]
    );

    const reviews = await db.query(
      'select * from reviews where restaurant_id = $1',
      [restaurantId]
    );
    res.status(200).json({
      status: 'success',
      data: {
        restaurant: results.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (error) {
    console.error(error);
  }
});

// Create a restaurant
app.post('/api/v1/restaurants', async (req, res) => {
  try {
    const { name, location, price_range } = req.body;
    const results = await db.query(
      'INSERT INTO restaurants (name,location,price_range) values ($1, $2, $3) RETURNING *',
      [name, location, price_range]
    );

    res.status(201).json({
      status: 'success',
      message: 'Successfully Added!',
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

// Update a restaurant
app.put('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const { name, location, price_range } = req.body;
    const results = await db.query(
      'UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 RETURNING *',
      [name, location, price_range, restaurantId]
    );
    res.status(200).json({
      status: 'success',
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

// Delete a restaurant
app.delete('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const results = await db.query('DELETE from restaurants where id = $1', [
      restaurantId,
    ]);
    res.status(204).json({
      status: 'success',
      message: 'Deleted',
    });
  } catch (error) {
    console.error(error);
  }
});

// Add a review
app.post('/api/v1/restaurants/:id/add-review', async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const { name, review, rating } = req.body;

    const results = await db.query(
      'INSERT INTO reviews (restaurant_id, name, review, rating) values ($1,$2,$3,$4) returning *',
      [restaurantId, name, review, rating]
    );

    res.status(201).json({
      status: 'Success',
      data: {
        review: results.rows[0],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`SERVER IS UP ON PORT ${port}`);
});
