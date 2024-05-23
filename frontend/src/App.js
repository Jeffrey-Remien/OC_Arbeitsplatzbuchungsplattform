import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import MyBookings from './MyBookings';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/MyBookings" component={MyBookings} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
