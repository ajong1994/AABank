import React from 'react';
import ReactDOM from 'react-dom';
// import './styles/app.scss';
import './index.css'
import App from './App';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  ,document.getElementById('root')
);

