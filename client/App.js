import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import BurgerBuilder from './containers/BurgerBuilder/Burgerbuilder';
import Layout from './hoc/Layout/Layout';

/**
 * @description App
 * @class App
 */
class App extends Component {
  /**
   * @returns {JSX} jsx
   */
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route exact path="/checkout" component={BurgerBuilder} />
            <Route path="/" component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
