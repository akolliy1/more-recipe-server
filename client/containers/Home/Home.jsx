import React, { Component } from 'react';
import Aux from '../../hoc/Auxs/Auxs';
import Header from '../../components/Home/Navigation/Header';
import Footer from '../../components/Home/Navigation/Footer';
import Carousel from '../../components/UI/carousel/carousel';
import Content from '../../components/Home/Content/Content';
/**
 * @description Home Component
 * @class Home
 */
class Home extends Component {
  /**
       * @returns {JSX} jsx
       */
  render() {
    return (
      <Aux>
        <Header />
        <Carousel />
        <Content />
        <Footer />
      </Aux>
    );
  }
}

export default Home;
