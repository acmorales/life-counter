import React from 'react';
import io from 'socket.io-client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Landing from './Landing';
import PlayerJoin from './PlayerJoin';
import LifeDisplay from './LifeDisplay';
import Dashboard from './Dashboard';
import Error from './Error';

const socket = io();

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/join/" exact render={(props) => <PlayerJoin {...props} socket={socket} />} />
      <Route path="/board/" exact render={(props) => <LifeDisplay {...props} socket={socket} />} />
      <Route path="/dashboard/:userId" render={(props) => <Dashboard {...props} socket={socket} />} />
      <Route component={Error} />
    </Switch>
  </Router>
);

export default App;
