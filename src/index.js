import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// STATE
import ShowsState from './context/shows/ShowsState';
import AlertState from './context/alerts/AlertsState';
import { AuthContextProvider } from './context/auth/authContext';

ReactDOM.render(
  <AuthContextProvider>
    <ShowsState>
      <AlertState>
        <App />
      </AlertState>
    </ShowsState>
  </AuthContextProvider>,
  document.getElementById('root')
);

reportWebVitals();
