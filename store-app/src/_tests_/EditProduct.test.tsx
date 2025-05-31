import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ManageProducts from '../components/ManageProducts';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import * as ProductService from '../services/ProductService';


jest.mock('../services/ProductService');

const mockProduct = {
  id: '1',
  title: 'Old Title',
  price: 9.99,
  description: 'Old description',
  category: "electronics",
  image: 'old.jpg',
};

describe('ManageProducts - Edit Product', () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    jest.resetAllMocks();
    (ProductService.fetchProducts as jest.Mock).mockResolvedValue([mockProduct]);
    (ProductService.updateProduct as jest.Mock).mockResolvedValue(undefined);
  });

  it('edits a product when form is submitted', async () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <ManageProducts />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );

    // Wait for product to render
    expect(await screen.findByText('Old Title')).toBeInTheDocument();

    // Click Edit
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    // Update the title field
    const titleInput = screen.getByLabelText(/title/i);
    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /update product/i });
    fireEvent.click(submitButton);

    // Wait for async submit
    await waitFor(() => {
      expect(ProductService.updateProduct).toHaveBeenCalledWith('1', expect.objectContaining({
        title: 'Updated Title'
      }));
    });
  });
});