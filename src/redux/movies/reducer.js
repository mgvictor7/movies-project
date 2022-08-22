const initialState = {
  movies: [],
  favoritesMovies: [],
  lastUpdate: null,
};

export default function movies(state = initialState, action) {
  switch (action.type) {
    case 'MOVIES_GET_MOVIES': {
      const { movies } = action.data;
      const _movies = [...state.movies, ...movies];
      return {
        ...state,
        movies: _movies,
        lastUpdate: Date.now(),
      };
    }
    default:
      return state;
  }
}
