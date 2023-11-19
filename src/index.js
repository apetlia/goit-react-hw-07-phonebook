import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import { ThemeProvider } from '@emotion/react';

import App from 'components/App';
import './index.css';

const theme = {
  colors: {
    black: '#000000',
    gray: '#808080',
    silver: '#C0C0C0',
    lightGray: '#D3D3D3',
    whiteSmoke: '#F5F5F5',
    white: '#FFFFFF',
  },
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
