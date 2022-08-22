const initialState = {
  movies: [],
  currentPage: null,
  favoritesMovies: [],
  lastUpdate: null,
};

export default function movies(state = initialState, action) {
  switch (action.type) {
    case 'MOVIES_GET_MOVIES': {
      const { movies, page } = action.data;
      let _movies = [...state.movies, ...movies];

      // Delete movies duplicates
      _movies = [...new Map(_movies.map((m) => [m.id, m])).values()];
      return {
        ...state,
        movies: _movies,
        currentPage: page,
        lastUpdate: Date.now(),
      };
    }
    default:
      return state;
  }
}
