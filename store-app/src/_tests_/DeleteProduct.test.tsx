import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { MemoryRouter } from 'react-router-dom';
import ManageProducts from '../components/ManageProducts';

jest.mock('../services/ProductService', () => ({
    fetchProducts: jest.fn().mockResolvedValue([
        {
            id: '1',
            title: 'Test Product',
            price: 19.99,
            description: 'Test Description',
            category: 'electronics',
            image: 'test.jpg',

        }
    ]),
    deleteProduct: jest.fn().mockResolvedValue(undefined),
    createProduct: jest.fn(),
    updateProduct: jest.fn(),
}))

const queryClient= new QueryClient();

describe('ManageProducts - Delete & Edit', () => {
    test('deletes a product when Delete button is clicked and confirmed', async () => {
        jest.spyOn(window, 'confirm').mockReturnValueOnce(true);

        render(
            <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              <MemoryRouter>
                <ManageProducts />
              </MemoryRouter>
            </QueryClientProvider>
          </Provider>
        )

        await screen.findByText(/test product/i);

        const deleteButton = screen.getByRole('button', {name: /delete/i});
        await userEvent.click(deleteButton);

        await waitFor(() => {
            expect(screen.getByText(/product deleted/i)).toBeInTheDocument();
        });
    });
});