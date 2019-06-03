import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.scss';

import { Provider } from './contexts';
import Routes from './Routes';

const App = () => (
  <Provider>
    <Router>
      <Route path="/" component={Routes} />
    </Router>
  </Provider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);