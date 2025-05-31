
import { render, screen } from '@testing-library/react';
import Products from '../components/Products';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import * as ProductService from '../services/ProductService'; // <-- to mock

const queryClient = new QueryClient();

jest.mock('../services/ProductService');

const mockProducts = [
  {
    id: '1',
    title: 'Test Product 1',
    price: 9.99,
    description: 'Description 1',
    category: 'electronics',
    image: 'https://example.com/image1.jpg',
  },
  {
    id: '2',
    title: 'Test Product 2',
    price: 19.99,
    description: 'Description 2',
    category: 'jewelery',
    image: 'https://example.com/image2.jpg',
  },
];

const mockCategories = ['electronics', 'jewelery'];

describe('Products component', () => {
  beforeEach(() => {
    (ProductService.fetchProducts as jest.Mock).mockResolvedValue(mockProducts);
    (ProductService.fetchCategories as jest.Mock).mockResolvedValue(mockCategories);
  });

  it('renders a list of product titles', async () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <Products />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );

    const titles = await screen.findAllByTestId('product-title');
    expect(titles).toHaveLength(mockProducts.length);
    expect(titles[0]).toHaveTextContent('Test Product 1');
    expect(titles[1]).toHaveTextContent('Test Product 2');
  });
});