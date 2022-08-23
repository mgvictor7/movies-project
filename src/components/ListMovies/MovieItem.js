import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import usePosterImage from '../../hooks/usePosterImage';

import './MovieItem.scss';

export default function MovieItem(props) {
  const { movie } = props;

  const { id, poster_path, title, popularity, release_date } = movie

  const urlImg = usePosterImage(poster_path);

  return (
    <div className='movieItem'>
      <div className='image'>
        <div className='wrapperImg'>
          <Link to={`/movie/${id}`}>
            <img src={urlImg} alt={urlImg} />
          </Link>
        </div>
      </div>
      <div className='movieData'>
        <Link to={`/movie/${id}`}>
          <span className='title'>{title}</span>
        </Link>
        <p className='releaseDate'>{release_date}</p>
        <p className='popularity'>
          <span>Popularity: </span>
          {popularity}
        </p>
        <div className="showDetailsBtnWrapper">
          <Link className="showDetailsBtn" to={`/movie/${id}`}>
            Show details
          </Link>
        </div>
      </div>
    </div>
  );
}

MovieItem.propTypes = {
  movie: PropTypes.objectOf(PropTypes.any).isRequired,
};
