import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RestaurantContextProvider } from './context/RestaurantContext';
import Home from './routes/Home';
import RestaurantDetail from './routes/RestaurantDetail';
import UpdatePage from './routes/UpdatePage';

function App() {
  return (
    <RestaurantContextProvider>
      <div className="container">
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/restaurants/:id/update"
              element={<UpdatePage />}
            ></Route>
            <Route
              path="/restaurants/:id"
              element={<RestaurantDetail />}
            ></Route>
          </Routes>
        </Router>
      </div>
    </RestaurantContextProvider>
  );
}

export default App;
