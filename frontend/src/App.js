import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import MyBookings from './MyBookings';
import Navbar from './Components/Navbar';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/MyBookings" component={MyBookings} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
