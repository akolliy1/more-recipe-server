import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Search from './containers/Search/Search';
import SignIn from './containers/Forms/SignIn';
import SignUp from './containers/Forms/Signup';
import Form from './components/UI/Recipe/Recipe';
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
      <div>
        {/* <Layout> */}
        <Switch>
          <Route path="/search" exact component={Search} />
          <Route path="/create" exact component={SignUp} />
          <Route path="/checkin" exact component={SignIn} />
          <Route path="/view" exact component={Form} />
          <Route path="/" exact component={Search} />
        </Switch>
        {/* </Layout> */}
      </div>
    );
  }
}

export default App;
