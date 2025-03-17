import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'

const {
  REACT_APP_EVENT_MAIN_COLOR = '#f3fff2',
  REACT_APP_EVENT_IMAGE,
} = process.env;

document.body.style.backgroundColor = REACT_APP_EVENT_MAIN_COLOR;
document.body.style.backgroundImage = `url(${REACT_APP_EVENT_IMAGE})`;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <App />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
