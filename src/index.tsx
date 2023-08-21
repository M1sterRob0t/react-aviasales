import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import App from './components/App';
import store from './store/store';
import { fetchTickets } from './store/async-actions';
import { TThunkAppDispatch } from './types';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
(store.dispatch as TThunkAppDispatch)(fetchTickets());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
