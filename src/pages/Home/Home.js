import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import * as MoviesActions from '../../redux/movies/actions';

import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import Search from '../../components/Search';

import ListMovies from '../../components/ListMovies';

import './Home.scss';


export default function Home() {
  const getMoviesRef = useRef();
  const isSearchingRef = useRef(false);
  const searchTextRef = useRef();

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const movies = useSelector(state => state.movies.movies);

  const dispatch = useDispatch();
  const getMovies = (params) => {
    dispatch(MoviesActions.getMovies(params));
  }
  const searchMovies = (params) => {
    dispatch(MoviesActions.searchMovies(params));
  }
  const resetMovies = (params) => {
    dispatch(MoviesActions.resetMovies(params));
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

    clearTimeout(getMoviesRef.current);
    getMoviesRef.current = setTimeout(() => {
      getMovies(params);
    }, 1000);
  }

  const handleRetryGetMovies = () => {
    handleGetMovies();
  }

  const handleSearchMovie = (text) => {
    searchTextRef.current = text;
    setIsLoading(true);
    if (!isSearchingRef.current) {
      isSearchingRef.current = true;
      resetMovies();
    }
    const params = {
      query: text,
      callbackOK: () => { setIsLoading(false); },
    };
    searchMovies(params);
  }

  const handleCancelSearch = () => {
    isSearchingRef.current = false;
    searchTextRef.current = null
    resetMovies();
    handleGetMovies();
  }

  const handleGetMoviesEndScroll = () => {
    if (isSearchingRef.current) {
      handleSearchMovie(searchTextRef.current);
    } else {
      handleGetMovies();
    }
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
        <Search
          handleSearchMovie={handleSearchMovie}
          handleCancelSearch={handleCancelSearch}
        />
        {isLoading && <Loading center />}
        {hasError &&
          <ErrorMessage retryGetMovies={handleRetryGetMovies} />
        }

        {renderMovies()}
      </>
    </Layout>
  );
}

