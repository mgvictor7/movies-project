import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import * as MoviesActions from '../../redux/movies/actions';

import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';

import MovieItem from './MovieItem';

import './Home.scss';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const movies = useSelector(state => state.movies.movies);

  const dispatch = useDispatch();
  const getMovies = (params) => {
    dispatch(MoviesActions.getMovies(params));
  }

  useEffect(() => {
    handleGetMovies();
  }, []);

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
    getMovies(params);
  }

  const handleRetryGetMovies = () => {
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
        <div className="listMovies">
          {movies.map(x => 
            <MovieItem key={x.id} movie={x} />
          )}
        </div>
      );
    }
    return null;
  }

  return (
    <Layout>
      <>
        {isLoading && <Loading center />}
        {hasError &&
          <ErrorMessage retryGetMovies={handleRetryGetMovies} />
        }

        {renderMovies()}
      </>
    </Layout>
  );
}

