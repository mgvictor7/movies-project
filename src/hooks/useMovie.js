import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'

import * as MoviesActions from '../redux/movies/actions';


/**
 * Get movie from store or get from request
 * @param {Number} idMovie 
 * @returns
 */
const useMovie = (idMovie) => {
  const matchMovie = useSelector((state) => state.movies.movies.find(x => x.id === idMovie));

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const dispatch = useDispatch();
  const getMovie = (params) => {
    dispatch(MoviesActions.getMovie(params));
  }
  
  useEffect(() => {
    if (matchMovie) {
      setMovie(matchMovie);
    } else {
      handleGetMovie()
    }
  }, [matchMovie]);

  const handleGetMovie = () => {
    setIsLoading(true);
    const params = {
      idMovie,
      callbackOK: (currentMoive) => {
        setIsLoading(false);
        setMovie(currentMoive);
      },
      callbackERROR: () => {
        setIsLoading(false);
        setHasError(true);
      }
    }
    getMovie(params);
  };

  return [isLoading, hasError, movie];
}

export default useMovie;
