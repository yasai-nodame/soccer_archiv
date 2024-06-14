import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import VideoPlayer from './VideoPlayer';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/video/:id" component={VideoPlayer} />
      </Switch>
    </Router>
  );
}

export default App;
