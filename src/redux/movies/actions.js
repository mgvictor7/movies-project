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
 * Set movie as favorite
 * 
 * @param {Object} args
 * @param {Number} args.idMovie
 * @param {Boolean} args.isFavorite
 * @param {Function} [args.callbackOK]
 */
export function setFavoriteMovie(args) {
  return async (dispatch) => {
    const { idMovie, isFavorite } = args;
    dispatch({
      type: 'MOVIES_FAVORITE_MOVIE',
      data: {
        idMovie,
        isFavorite,
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



