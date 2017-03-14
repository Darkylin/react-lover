// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import MainPage from './pages/MainPage';
import ConfigPage from './pages/ConfigPage';


export default (
  <Route path="/" component={MainPage}>
    <IndexRoute component={ConfigPage} />
    <Route path="/config" component={ConfigPage} />
  </Route>
);
