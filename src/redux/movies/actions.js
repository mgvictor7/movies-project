import AxiosRequest from '../../libs/AxiosRequest';

/**
 *  Get popular movies
 * 
 * @param {Object} args
 * @param {Function} [args.callbackOK]
 * @param {Function} [args.callbackERROR]
 */
 export function getMovies(args) {
  return async (dispatch, getState) => {
    const state = getState();
    const { currentPage } = state.movies;

    const params = {}
    if (currentPage) {
      params.page = currentPage + 1;
    } else {
      params.page = 1;
    }
  
    AxiosRequest({
      url: 'movie/popular',
      method: 'GET',
      params,
    })
      .then((response) => {
        const { page, results } = response.data;
        const result = {
          page,
          movies: results,
        };

        dispatch({
          type: 'MOVIES_GET_MOVIES',
          data: result,
        });

        if (args.callbackOK) {
          args.callbackOK();
        }
      })
      .catch(async (error) => {
        if (args.callbackERROR) {
          args.callbackERROR(error);
        }
      });
  };
}


/**
 * Search movies by text
 * 
 * @param {Object} args
 * @param {String} [args.query]
 * @param {Function} [args.callbackOK]
 * @param {Function} [args.callbackERROR]
 */
 export function searchMovies(args) {
  return async (dispatch, getState) => {
    const state = getState();
    const { currentPage } = state.movies;

    const params = {
      query: args.query,
    }
    if (currentPage) {
      params.page = currentPage + 1;
    } else {
      params.page = 1;
    }
  
    AxiosRequest({
      url: 'search/movie',
      method: 'GET',
      params,
    })
      .then((response) => {
        const { page, results } = response.data;
        const result = {
          page,
          movies: results,
        };

        dispatch({
          type: 'MOVIES_GET_MOVIES',
          data: result,
        });

        if (args.callbackOK) {
          args.callbackOK();
        }
      })
      .catch(async (error) => {
        if (args.callbackERROR) {
          args.callbackERROR(error);
        }
      });
  };
}

/**
 *  Get movie by id
 * 
 * @param {Object} args
 * @param {Number} args.idMovie
 * @param {Function} [args.callbackOK]
 * @param {Function} [args.callbackERROR]
 */
 export function getMovie(args) {
  return async (dispatch) => {
    const params = {
    }

    AxiosRequest({
      url: `movie/${args.idMovie}`,
      method: 'GET',
      params,
    })
      .then((response) => {
        const movie = response.data;

        dispatch({
          type: 'MOVIES_GET_MOVIE',
          data: {
            movie
          },
        });

        if (args.callbackOK) {
          args.callbackOK(movie);
        }
      })
      .catch(async (error) => {
        if (args.callbackERROR) {
          args.callbackERROR(error);
        }
      });
  };
}


/**
 * Rate Movie
 * 
 * @param {Object} args
 * @param {Number} args.idMovie
 * @param {Number} args.rateMovieValue
 * @param {Function} [args.callbackOK]
 * @param {Function} [args.callbackERROR]
 */
 export function setRateMovie(args) {
  return async (dispatch, getState) => {
    const state = getState();
    const { session } = state.user;

    const params = {
    };

    const data = {
      value: parseInt(args.rateMovieValue, 10),
      session_id: session.session_id,
    }

    AxiosRequest({
      url: `movie/${args.idMovie}/rating`,
      method: 'POST',
      params,
      data,
    })
      .then((response) => {
        const result = response.data;

        dispatch({
          type: 'MOVIES_RATE_MOVIE',
          data: {
            result
          },
        });

        if (args.callbackOK) {
          args.callbackOK();
        }
      })
      .catch(async (error) => {
        console.log('error', error)
        if (args.callbackERROR) {
          args.callbackERROR(error);
        }
      });
  };
}

/**
 * Set movie as favorite
 * 
 * @param {Object} args
 * @param {Number} args.idMovie
 * @param {Boolean} args.isFavorite
 * @param {Function} [args.callbackOK]
 * @param {Function} [args.callbackERROR]
 */
 export function setFavoriteMovie(args) {
  return async (dispatch, getState) => {
    const state = getState();
    const { session, user } = state.user;
    const { idMovie, isFavorite } = args;

    const params = {
      session_id: session.session_id,
    };

    const data = {
      media_type: 'movie',
      media_id: idMovie,
      favorite: isFavorite,
    }

    AxiosRequest({
      url: `account/${user.username}/favorite`,
      method: 'POST',
      params,
      data,
    })
      .then((response) => {
        const result = response.data;

        dispatch({
          type: 'MOVIES_FAVORITE_MOVIE',
          data: {
            idMovie,
            isFavorite,
            ...result,
          }
        });

        if (args.callbackOK) {
          args.callbackOK();
        }
      })
      .catch(async (error) => {
        if (args.callbackERROR) {
          args.callbackERROR(error);
        }
      });
  };
}

/**
 * Get favorites movies
 * 
 * @param {Object} args
 * @param {Function} [args.callbackOK]
 * @param {Function} [args.callbackERROR]
 */
 export function getFavoritesMovies(args) {
  return async (dispatch, getState) => {
    const state = getState();
    const { session, user } = state.user;
    const { currentPageFavoritesMovies } = state.movies;

    const params = {
      session_id: session.session_id,
    };

    if (currentPageFavoritesMovies) {
      params.page = currentPageFavoritesMovies + 1;
    } else {
      params.page = 1;
    }


    AxiosRequest({
      url: `account/${user.username}/favorite/movies`,
      method: 'GET',
      params,
    })
      .then((response) => {
        const { page, results } = response.data;
        const result = {
          page,
          movies: results,
        };

        dispatch({
          type: 'MOVIES_GET_FAVORITES_MOVIES',
          data: result
        });

        if (args.callbackOK) {
          args.callbackOK();
        }
      })
      .catch(async (error) => {
        if (args.callbackERROR) {
          args.callbackERROR(error);
        }
      });
  };
}

/**
 * Reset list movies
 */
export function resetMovies() {
  return async (dispatch, getState) => {
    dispatch({
      type: 'MOVIES_RESET',
    });
  };
}



