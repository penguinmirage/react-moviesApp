


import React, {Component} from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import MovieapiService from './api-service/movieapi.js'


const movieapi = new MovieapiService();

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);
