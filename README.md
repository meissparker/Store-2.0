Since I already went over the store components in the last project I will just go over the testing process in this project.
The .github/workflows folder in my project has a GitHub Actions workflow that sets up a CI/CD pipeline that installs dependencies
runs test, and deploys the app to Vercel if the tests pass. Then the vercel folder stores some vercel
credentials needed to connect the workflow to my vercel account. Then I had 4 tests that I ran using jest.


DeleteProducts.test.jsx


This test ensures that a product can be deleted from the ManageProducts component when the "Delete" button is clickec
and the confirmation is accepted. It makes fake product fetching and deleting services, and renders the component
in the necessary wrappings, then simulates the delete action using fake user events. The test will pass if 
the confirmation message "Product deleted" appears in the document after the deletion is triggered.\


EditProduct.test.tsx


This tests that the ManageProducts component updates a product correctly when the edit form is submitted. It 
creates fake product data and functions and simulates user actions to edit the product's tile. It also checks
that the update function is called with the expected data.


Products.test.tsx


This test ensures that the Products component correctly displays the products fetched from a fake service. It 
checks that both mock products that have been hardcoded into the test appear with the expected content.


RemoveItem.test.tsx


This tests that an item has been successfully removed from the cart when the "Remove Item" button is clicked.
It mocks Firebase and Auth0 authentication and uses Redux and React Query providers to render the ShoppingCart
component in a test environment.



