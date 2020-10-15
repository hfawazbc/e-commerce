import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import UserContextProvider from './contexts/UserContext';
import AdminContextProvider from './contexts/AdminContext';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <AdminContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AdminContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
