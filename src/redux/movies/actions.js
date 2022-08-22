import AxiosRequest from '../../libs/AxiosRequest';

/**
 *
 * @param {Object} args
 * @param {Number} [args.page]
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
