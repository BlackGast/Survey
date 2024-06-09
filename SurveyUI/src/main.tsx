import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import './index.scss';
import { Constants } from './model/Constants.ts';

ReactDOM.createRoot(document.getElementById(`${Constants.REACT_ROOT_ID}`)!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
