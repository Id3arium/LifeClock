import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import App2 from './Components/App2';
import reportWebVitals from './reportWebVitals';

const root = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <App2 />
  </React.StrictMode>
,root);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
