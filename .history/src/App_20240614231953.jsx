import React from 'react'
import Home from './pages/Home/Home'
import { Router } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="video/:id" component={VideoPlayer} />
      </Switch>
    </Router>
  )
}

export default App
