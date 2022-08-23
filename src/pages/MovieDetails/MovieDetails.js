import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import Rater from 'react-rater'

import * as MoviesActions from '../../redux/movies/actions';

import useMovie from '../../hooks/useMovie';
import usePosterImage from '../../hooks/usePosterImage';
import useUserAutheticated from '../../hooks/useUserAutheticated';

import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';

import './MovieDetails.scss';

export default function MovieDetails() {
  const { idMovie } = useParams();

  const [isFavorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState(0);

  const [isAuthenticated, user] = useUserAutheticated();
  const [isLoading, hasError, movie] = useMovie(parseInt(idMovie, 10));
  const urlImg = usePosterImage(movie?.poster_path);

  const matchFavoriteMovie = useSelector(state => state.movies.favoritesMovies[idMovie]);

  useEffect(() => {
    if (matchFavoriteMovie) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [matchFavoriteMovie]);

  const dispatch = useDispatch();
  const setRateMovie = (params) => {
    dispatch(MoviesActions.setRateMovie(params));
  }
  const setFavoriteMovie = (params) => {
    dispatch(MoviesActions.setFavoriteMovie(params));
  }

  const handleFavorite = () => {
    const params = {
      idMovie,
      isFavorite: !isFavorite,
    };
    setFavoriteMovie(params);
    setIsFavorite(prev => !prev);
  };

  const handleRate = (args) => {
    setRating(args.rating);
    const params = {
      idMovie,
      rateMovieValue: args.rating,
    };
    setRateMovie(params);
  };

  const renderMarkAsFavorite = () => {
    return (
      <div
        className="favorite-wrapper"
        title='Set favorite'
      >
        <FontAwesomeIcon
          icon={faHeart}
          size={'2x'}
          color={isFavorite ? '#db4242' : '#aba8a8'}
          onClick={handleFavorite}
        />
      </div>
    )
  }

  const renderMovieDetails = () => {
    if (!isLoading && !hasError && movie) {
      return (
        <div className='movieDetails'>
          {isAuthenticated && renderMarkAsFavorite()}
          <div className='image'>
            <div className='wrapperImg'>
              <img src={urlImg} alt={urlImg} />
            </div>
          </div>
          <div className='details'>
            <p className='title'>{movie.title}</p>
            <p className='releaseDate'>{movie.release_date}</p>
            <p className='overview'>{movie.overview}</p>
          </div>
          {isAuthenticated &&
            <div className='rate-wrapper'>
              <p className='rate-title'>Rate the movie</p>
              <Rater total={10} rating={rating} onRate={handleRate} />

            </div>
          }
        </div>
      );
    }
    return null;
  };

  return (
    <Layout>
      <>
        {isLoading && <Loading center />}
        {hasError &&
          <ErrorMessage />
        }
        {renderMovieDetails()}
      </>
    </Layout>
  )
}