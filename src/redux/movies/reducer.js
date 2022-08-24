const initialState = {
  movies: [],
  favoritesMovies: [],
  currentPage: null,
  currentPageFavoritesMovies: null,
  indexCurrentFavoritesMovies: {},
};

export default function movies(state = initialState, action) {
  switch (action.type) {
    case 'MOVIES_GET_MOVIES': {
      const { movies, page } = action.data;
      const _movies = [...state.movies, ...movies];

      return {
        ...state,
        movies: _movies,
        currentPage: page,
      };
    }
    case 'MOVIES_GET_FAVORITES_MOVIES': {
      const { movies, page } = action.data;
      const _movies = [...state.favoritesMovies, ...movies];

      return {
        ...state,
        favoritesMovies: _movies,
        currentPageFavoritesMovies: page,
      };
    }
    case 'MOVIES_FAVORITE_MOVIE': {
      const { idMovie, isFavorite, } = action.data;
      return {
        ...state,
        indexCurrentFavoritesMovies: {
          ...state.indexCurrentFavoritesMovies,
          [idMovie]: isFavorite,
        },
      }
    }
    case 'MOVIES_RESET': {
      return {
        movies: [],
        favoritesMovies: [],
        currentPage: null,
        currentPageFavoritesMovies: null,
        indexCurrentFavoritesMovies: {},
      }
    }
    default:
      return state;
  }
}
