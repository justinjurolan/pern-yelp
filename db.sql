-- psql

-- for help \?

-- list database \l

-- Create Database 
CREATE DATABASE practice;

-- Connect to a new database \c databasename

-- Create Table

CREATE TABLE products (
    id INT,
    name VARCHAR(50),
    price INT,
    on_sale boolean
);

-- list all tables \d

-- Add new column to the table
ALTER TABLE products ADD COLUMN featured boolean;

-- Remove/Drop Column
ALTER TABLE products DROP COLUMN featured;

-- Remove/Drop Tables 
DROP TABLE products;

-- REMOVE/Drop Database
-- first connect to other existing database
DROP DATABASE practice;

-- create table for yelp db app
CREATE TABLE restaurants (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL check(price_range >= 1 and price_range <= 5)
);

-- create table for reviews
CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(rating >= 1 and rating <= 5)
);

-- insert row data in the table column and return all its value
-- sample 
INSERT INTO restaurants (id, name, location, price_range) values (123, 'mcdonalds', 'new york', 50) RETURNING *;

-- view table data
-- * represents all column
-- you can change to a column name to output specific column
select * from restaurants;
select name, location from restaurants;

-- select specific rows
select * from restaurants where id = 1;

-- update a specific item by id
UPDATE restaurants SET name = "chow king", location = "taguig", price_range = 3 where id = 5 RETURNING *;

-- Delete a specific item by id
DELETE FROM restaurants where id = 8;

-- Get a specific item by id where id is referred to other table
select * from reviews where restaurant_id = $1;

-- Insert a item by id where id is referred to other table
INSERT INTO reviews (restaurant_id, name, review, rating) values (2, 'James', 'I LOVE IT', 4.5);

-- Aggregate function getting the average of the restaurant based on the specific id
SELECT trunc(AVG(rating),2) as avg_rating from reviews where restaurant_id = 1;

-- Get the number of reviews per restaurant
SELECT count(rating) from reviews where restaurant_id = 1;

-- Group the restaurant by location
set location, count(location) from restaurants group by location;

-- Group by restaurant_id and their respective review count
select restaurant_id, count(restaurant_id) as resto_reviews from reviews group by restaurant_id;

-- Getting restaurant avg rating and ratings counts
select restaurant_id, AVG(rating), COUNT(rating) from reviews group by restaurant_id;

-- using JOIN Method (Advanced topic)
-- Get all restaurants final
select * from restaurants left join (select restaurant_id, COUNT(*) as review_count, TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;

-- Getting single restaurants final
select * from restaurants left join (select restaurant_id, COUNT(*) as review_count, TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = 1;


-- Parametized Query to prevent SQL injection attacks
-- await db.query('select * from restaurants where id = $1', [
--      restaurantId,
--   ])

