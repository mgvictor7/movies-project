import React, { useState } from 'react';
import { useParams } from "react-router-dom";

import useMovie from '../../hooks/useMovie';
import usePosterImage from '../../hooks/usePosterImage';

import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';

import './MovieDetails.scss';

export default function MovieDetails(props) {
  const { idMovie } = useParams();

  const [isLoading, hasError, movie] = useMovie(parseInt(idMovie, 10));
  const urlImg = usePosterImage(movie?.poster_path);

  const renderMovieDetails = () => {
    if (!isLoading && !hasError && movie) {
      return (
        <div className='movieDetails'>
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