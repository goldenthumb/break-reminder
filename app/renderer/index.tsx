import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.scss';

import Routes from './Routes';

function App() {
  return (
    <Router>
      <Route
        path="/"
        component={Routes}
      />
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
