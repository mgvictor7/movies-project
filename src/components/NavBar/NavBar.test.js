import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import App from '../../App';


const initialState = {
  user: {
    user: null,
    token: null,
    session: null,
  },
  movies: {
    movies: [],
    favoritesMovies: [],
    currentPage: null,
    currentPageFavoritesMovies: null,
    indexCurrentFavoritesMovies: {},
  },
};

const mockStore = configureStore();
let store;

test('renders nav bar need login', async () => {
  store = mockStore(initialState);
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  await waitFor(() => { expect(screen.getByText('Login')).toBeInTheDocument() })
});


test('renders nav bar user logged', async () => {
  initialState.user.user = { username: 'user1' };
  store = mockStore(initialState);
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const items = await screen.findAllByText('Logout');
  expect(items).toHaveLength(2);
});
