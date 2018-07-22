import React, { Component } from 'react';
import Header from '../../components/Profile/Header/Header';
import Image from '../../components/Profile/Image/Image';
import Aux from '../../hoc/Auxs/Auxs';
import Segment from '../../components/Profile/Segment/Segment';
import Main from '../../components/Profile/Main/Main';
/**
 * @description Sign in component
 * @class SignIn
 * @extends Component
 */
class Recipe extends Component {
  /**
     * @description render Component
     * @return {jsx} jsx
     */
  render() {
    return (
      <Aux>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.9/semantic.min.css" />
        <Header />
        <div className="container">
          <Image />
          <div className="ui segment">
            <section className="row">
              <Segment />
              <Main />
            </section>
          </div>
        </div>
      </Aux>
    );
  }
}

export default Recipe;
