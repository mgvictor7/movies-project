import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from '../pages/Home';
import Login from "../pages/Login";
import MovieDetails from '../pages/MovieDetails';

const CurrentRoutes =  () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="movie/:idMovie" element={<MovieDetails />} />
      <Route path="login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

export default CurrentRoutes;