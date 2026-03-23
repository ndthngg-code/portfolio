import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SiteProvider } from './context/SiteContext.jsx';
import App from './App.jsx';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <SiteProvider>
      <App />
    </SiteProvider>
  </BrowserRouter>
);
