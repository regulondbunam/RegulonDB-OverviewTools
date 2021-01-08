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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
