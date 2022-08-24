import { render, screen } from '@testing-library/react';

import ErrorMessage from './ErrorMessage';

test('renders error message with retry function', () => {
  render(
    <ErrorMessage retryGetMovies={() => {}} />
  );
  const linkElement = screen.getByText('Retry');
  expect(linkElement).toBeInTheDocument();
});
