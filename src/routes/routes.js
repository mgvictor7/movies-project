import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from '../pages/Home';
import Login from "../pages/Login";
import MovieDetails from '../pages/MovieDetails';
import MoviesFavorites from '../pages/MoviesFavorites';

import RequireAuth from '../components/RequireAuth';

/**
 * Set available routes
 */
const CurrentRoutes =  () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="movie/:idMovie" element={<MovieDetails />} />
      <Route path="login" element={<Login />} />
      <Route
        path="favorites"
        element={
          <RequireAuth>
            <MoviesFavorites />
          </RequireAuth>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default CurrentRoutes;