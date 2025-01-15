import React from 'react';
import ReactDOM from 'react-dom/client'; // Use `react-dom/client` for `createRoot`
import App from './App'; // Your main App component
import { SearchProvider } from './hooks/SearchContext';

// Create the root and render the App wrapped with BrowserRouter
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SearchProvider>
    <App />
  </SearchProvider>
  </React.StrictMode>
);