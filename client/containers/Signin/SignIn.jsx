import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes, { any } from 'prop-types';
import Form from '../../components/Form/Form';
import FormValidator from '../../validations/FormValidator';
import { signinAction } from '../../redux/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Auxs/Auxs';

/**
 * @description Sign in component
 *
 * @class SignIn
 *
 * @extends Component
 */
class SignIn extends Component {
  state = {
    responseMsg: '',
    userForm: {
      username: {
        username: '',
        type: 'input',
        icon: 'fas fa-user-circle fa-1.5x',
        elementConfig: {
          type: 'text',
          placeholder: 'e.g Baptista',
          minLength: 3
        },
        touched: false,
        match: false,
        isSuccess: false,
        validation: {
          isValid: true,
          validMsg: 'No whitespace eg JohnDoe',
          InvalidMsg: 'Must be Atleast 3 characters',
          fallbackMsg: 'Must be Atleast 3 characters'
        }
      },
      password: {
        password: '',
        type: 'input',
        icon: 'fa fa-key',
        elementConfig: {
          type: 'password',
          placeholder: 'e.g johndoe12345',
          minLength: 8
        },
        touched: false,
        match: false,
        isSuccess: false,
        validation: {
          isValid: true,
          validMsg: 'No whitespace eg kenturkey1',
          InvalidMsg: 'Must be Atleast 8 characters',
          fallbackMsg: 'Must be Atleast 8 characters'
        }
      }
    }
  }
  /**
   * @function componentWillReceiveProps
   *
   * @param {*} nextProps
   *
   * @returns {state} state
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) {
      this.props.history.push('/view');
    }
    const error = 'Request failed with status code 404';
    if (nextProps.errorMsg === error && nextProps.isAuthenticated === false) {
      const errorMessage = nextProps.errorMsg === error ?
        nextProps.errorMsg.replace(error, 'Comfirm your username and password')
        : nextProps.errorMsg;
      this.setState({
        responseMsg: errorMessage
      });
    }
  }

  /**
   * @method onChangeHandler
   *
   * @param {*} event
   *
   * @param {*} id
   *
   * @return {Event} Change State on event
   */
  onChangeHandler = (event, id) => {
    const stateEventChange = { ...this.state.userForm };
    stateEventChange[id][id] = event.target.value;
    stateEventChange[id].touched = true;
    // validate
    FormValidator([id, stateEventChange]);
    // change state
    this.setState({
      userForm: stateEventChange
    });
  }

  /**
   * @method onChangeHandler
   *
   * @param {*} event
   *
   * @return {Event} Change State on event
   */
  onSubmitHandler = (event) => {
    event.preventDefault();
    this.setState({
      responseMsg: '',
    });

    const data = {
      username: this.state.userForm.username.username,
      password: this.state.userForm.password.password
    };

    this.props.signinAction(data);
  }

  /**
   * @method render
   *
     * @description render Component
     *
     * @return {jsx} jsx
     */
  render() {
    const loader = this.props.loading ? <Spinner /> : null;
    return (
      <Aux>
        {loader}
        <Form
          resMsg={this.state.responseMsg}
          clicked={this.onSubmitHandler}
          userForm={this.state.userForm}
          changed={this.onChangeHandler}
          alt="Create an Account"
          status="New to Recipe"
          social="Log in with"
          link="/create"
        >
      Sign In
        </Form>
      </Aux>
    );
  }
}

SignIn.propTypes = {
  signinAction: propTypes.func.isRequired,
  isAuthenticated: propTypes.bool.isRequired,
  history: propTypes.objectOf(any).isRequired,
  errorMsg: propTypes.string.isRequired,
  loading: propTypes.bool.isRequired
};

/**
 * @function mapStateToProps
 *
 * @param {*} state
 *
 * @return {props} Props
 */
const mapStateToProps = state => ({
  isAuthenticated: state.signin.isAuthenticated,
  errorMsg: state.signin.errorMessage,
  loading: state.signin.loading
});

/**
 * @function mapDispatchToProps
 *
 * @param {*} dispatch
 *
 * @return {props} Props
 */
const mapDispatchToProps = dispatch => ({
  signinAction: data => dispatch(signinAction(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
