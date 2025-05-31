
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import ShoppingCart from '../components/ShoppingCart';
import { addToCart } from '../redux/CartSlice';

jest.mock('firebase/auth', () => ({
  getAuth: () => ({}),
  onAuthStateChanged: jest.fn((auth, callback) => {
    callback({ uid: 'test-user-id' });
    return () => {};
  }),
}));

jest.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    isAuthenticated: true,
    isLoading: false,
    user: { name: 'Test User' },
    loginWithRedirect: jest.fn(),
    logout: jest.fn(),
  }),
}));

const queryClient = new QueryClient();

describe('Cart functionality', () => {
  it('removes an item from the cart when the remove button is clicked', async () => {
    store.dispatch(addToCart({
      id: '1',
      title: 'Test Product',
      image: 'test.jpg',
      price: 10,
    }));

    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={['/cart']}>
            <ShoppingCart />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );

    expect(await screen.findByText(/test product/i)).toBeInTheDocument();

    const removeButton = screen.getByRole('button', { name: /remove item/i });
    await userEvent.click(removeButton);

    await waitFor(() => {
      expect(screen.queryByText(/test product/i)).not.toBeInTheDocument();
    });
  });
});