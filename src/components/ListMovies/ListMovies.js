import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import MovieItem from './MovieItem';

import './ListMovies.scss';

export default function ListMovies(props) {
  const { movies, handleGetMovies } = props;

  const moviesListRef = useRef();


  const handleScroll  = () => {
    if (moviesListRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = moviesListRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        console.log("reached bottom");
        handleGetMovies();
      }
    }
  };

  return (
    <div
      className='ListMoviesWrapper'
    >
      
      <div
        className="listMovies"
        ref={moviesListRef}
        onScroll={handleScroll }
      >
        {movies.map(x => 
          <MovieItem key={x.id} movie={x} />
        )}
      </div>

    </div>
  );
}

ListMovies.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
  handleGetMovies: PropTypes.func.isRequired,
};

ListMovies.defaultProps = {
  movies: [],
}