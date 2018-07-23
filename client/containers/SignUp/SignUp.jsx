import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes, { any } from 'prop-types';
import Form from '../../components/Form/Form';
import FormValidator from '../../validations/FormValidator';
import { signUpAction } from '../../redux/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Auxs/Auxs';

/**
 * @description Sign in component
 *
 * @class SignIn
 *
 * @extends Component
 */
class Signup extends Component {
  state = {
    responseMsg: '',
    userForm: {
      name: {
        name: '',
        type: 'input',
        icon: 'fas fa-user',
        elementConfig: {
          type: 'text',
          placeholder: 'e.g John Doe',
          minLength: 3
        },
        touched: false,
        match: false,
        isSuccess: false,
        validation: {
          isValid: true,
          validMsg: 'At most a whitespace eg John Doe',
          InvalidMsg: 'Must be atleast 3 characters',
          fallbackMsg: 'Must be atleast 3 characters'
        }
      },
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
      email: {
        email: '',
        type: 'input',
        icon: 'fas fa-envelope',
        elementConfig: {
          type: 'email',
          placeholder: ' e.g JohnDoe@yahoo.com',
          minLength: 3
        },
        touched: false,
        match: false,
        isSuccess: false,
        validation: {
          isValid: true,
          validMsg: 'Must be standard eg johnDoe@gmail',
          InvalidMsg: 'Must be standard',
          fallbackMsg: 'Must be standard'
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
      name: this.state.userForm.name.name,
      username: this.state.userForm.username.username,
      email: this.state.userForm.email.email,
      password: this.state.userForm.password.password
    };

    this.props.signUpAction(data);
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
          status="Already a member"
          alt="Login Account"
          social="Sign up with"
          link="/checkin"
        >
      Create Account
        </Form>
      </Aux>
    );
  }
}


Signup.propTypes = {
  signUpAction: propTypes.func.isRequired,
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
  isAuthenticated: state.authReducer.isAuthenticated,
  errorMsg: state.authReducer.errorMessage,
  loading: state.authReducer.loading
});

/**
 * @function mapStateToProps
 *
 * @param {*} dispatch
 *
 * @return {props} Props
 */
const mapDispatchToProps = dispatch => ({
  signUpAction: data => dispatch(signUpAction(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
