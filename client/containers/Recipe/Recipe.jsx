import React, { Component } from 'react';
import propTypes, { any } from 'prop-types';
import miniToastr from 'mini-toastr';
import { connect } from 'react-redux';
import Header from '../../components/Page/Header/Header';
import Left from '../../components/Page/Segment/Left/Left';
import Aux from '../../hoc/Auxs/Auxs';
import Main from '../../components/Page/Main/Main';
import Right from '../../components/Page/Segment/Right/Right';
import { onRecipeAction } from '../../redux/actions/Recipe';

/**
 * @description Sign in component
 * @class SignIn
 * @extends Component
 */
class Recipe extends Component {
  /**
   * @function componentDidMount
   * @returns {viod} viod
   */
  componentDidMount() {
    onRecipeAction();
    const token = localStorage.getItem('userToken');
    if (!token) {
      miniToastr.init();
      miniToastr.error('Login to continue');
      this.props.history.goBack();
    }
  }
  /**
     * @description render Component
     * @return {jsx} jsx
     */
  render() {
    return (
      <Aux>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.9/semantic.min.css" />
        <Header />
        <div className="container-fluid">
          <div className="mt-3">
            <section className="row">
              <Left />
              <Main />
              <Right />
            </section>
          </div>
        </div>
      </Aux>
    );
  }
}

Recipe.propTypes = {
  isAuthenticated: propTypes.bool.isRequired,
  history: propTypes.objectOf(any).isRequired
};

/**
 * @function mapStateToProps
 *
 * @param {*} state
 *
 * @return {props} Props
 */
const mapStateToProps = state => ({
  isAuthenticated: state.recipe.isAuthenticated,
  errorMsg: state.recipe.errorMessage,
  loading: state.recipe.loading
});


/**
 * @function mapDispatchToProps
 *
 * @param {*} dispatch
 *
 * @return {props} Props
 */
const mapDispatchToProps = dispatch => ({
  onRecipeAction: () => dispatch(onRecipeAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
