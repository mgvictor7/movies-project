import React from 'react';

import usePosterImage from '../../hooks/usePosterImage';

import './Home.scss';

export default function MovieItem(props) {
  const { movie } = props;

  console.log(movie);
  const { poster_path, title, popularity, release_date } = movie

  const urlImg = usePosterImage(poster_path);

  return (
    <div className='movieItem'>
      <div className='image'>
        <div className='wrapperImg'>
          <img src={urlImg} />
        </div>
      </div>
      <div className='movieData'>
        <span className='title'>{title}</span>
        <p className='releaseDate'>{release_date}</p>
        <p className='popularity'>
          <span>Popularity: </span>
          {popularity}
        </p>
      </div>
    </div>
  );
}