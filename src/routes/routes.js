import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from '../pages/Home';
import MovieDetails from '../pages/MovieDetails';

const CurrentRoutes =  () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="movie/:idMovie" element={<MovieDetails />} />
    </Routes>
  </BrowserRouter>
);

export default CurrentRoutes;