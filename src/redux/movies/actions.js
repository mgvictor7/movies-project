import AxiosRequest from '../../libs/AxiosRequest';

/**
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
 *
 * @param {Object} args
 * @param {Number} [args.query]
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


 export function resetMovies() {
  return async (dispatch, getState) => {
    dispatch({
      type: 'MOVIES_RESET',
    });
  };
}



