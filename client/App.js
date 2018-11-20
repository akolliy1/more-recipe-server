import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Search from './containers/Search/Search';
import SignIn from './containers/Signin/SignIn';
import SignUp from './containers/Signup/Signup';
import Recipe from './containers/Recipe/Recipe';
import Profile from './containers/Profile/Profile';
/**
 * @class App
 * @extends Component
 */
class App extends Component {
  /**
     *@method Render
     *@return {JSX} jsx
     */
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Search} />
        <Route path="/search" exact component={Search} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/view" exact component={Recipe} />
        <Route path="/create" exact component={SignUp} />
        <Route path="/checkin" exact component={SignIn} />
      </Switch>
    );
  }
}

export default App;
