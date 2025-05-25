import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App.tsx'
import {Provider} from 'react-redux';
import {store} from './redux/store'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const queryClient = new QueryClient();

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

root.render(

    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <App/>
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
)
