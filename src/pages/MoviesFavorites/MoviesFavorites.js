import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import * as MoviesActions from '../../redux/movies/actions';

import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';

import ListMovies from '../../components/ListMovies';

import './MoviesFavorites.scss';

export default function MoviesFavorites() {
  const getMoviesRef = useRef();

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const movies = useSelector(state => state.movies.favoritesMovies);

  const dispatch = useDispatch();
  const getFavoritesMovies = (params) => {
    dispatch(MoviesActions.getFavoritesMovies(params));
  }

  useEffect(() => {
    if (!movies.length) {
      handleGetMovies();
    } else {
      setIsLoading(false);
    }
  }, [movies]);

  const handleGetMovies = () => {
    setHasError(false);
    setIsLoading(true);
  
    const params = {
      callbackOK: () => { setIsLoading(false); },
      callbackERROR: () => {
        setIsLoading(false);
        setHasError(true);
      },
    }

    clearTimeout(getMoviesRef.current);
    getMoviesRef.current = setTimeout(() => {
      getFavoritesMovies(params);
    }, 1000);
  }


  const handleGetMoviesEndScroll = () => {
    handleGetMovies();
  }

  const renderMovies = () => {
    if (!isLoading && !movies.length) {
      return (
        <p>No movies found</p>
      )
    }
    if (movies && movies.length) {
      return (
        <ListMovies
          movies={movies}
          handleGetMovies={handleGetMoviesEndScroll}
        />
      );
    }
    return null;
  }

  return (
    <Layout>
      <>
        {isLoading && <Loading center />}
        {hasError &&
          <ErrorMessage />
        }

        {renderMovies()}
      </>
    </Layout>
  );
}