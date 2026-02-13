import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import { Providers } from './app/providers';
import './app/styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);
