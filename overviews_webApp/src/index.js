import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import client from './config/ApolloClient';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from "react-router-dom";
import Overviews from './overviews'


ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
    <BrowserRouter>
      <Overviews />
    </BrowserRouter>
  </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);

reportWebVitals();
