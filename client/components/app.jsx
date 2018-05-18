import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Router, Route, Switch } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
const App = () => {
  return (
    <div>
      <p>React here!</p>
    </div>
  )
}

export default App

ReactDOM.render(<App />, document.getElementById('app'))
