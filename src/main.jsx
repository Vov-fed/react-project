import React from 'react';
import ReactDOM from 'react-dom/client'; // Use `react-dom/client` for `createRoot`
import App from './App'; // Your main App component

// Create the root and render the App wrapped with BrowserRouter
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);