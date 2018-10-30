import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Landing from './Landing';
import PlayerJoin from './PlayerJoin';
import LifeDisplay from './LifeDisplay';
import Dashboard from './Dashboard';
import Error from './Error';

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/join/" exact component={PlayerJoin} />
      <Route path="/board/" exact component={LifeDisplay} />
      <Route path="/dashboard/:userId" component={Dashboard} />
      <Route component={Error} />
    </Switch>
  </Router>
);

export default App;
