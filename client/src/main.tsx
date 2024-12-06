import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/index.ts';

const client = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <QueryClientProvider client={client}>
         <Provider store={store}>
            <App />
         </Provider>
      </QueryClientProvider>
   </StrictMode>
);
