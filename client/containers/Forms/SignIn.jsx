import React, { Component } from 'react';
import Form from './Form/Form';
import FormValidator from '../../validations/FormValidator';

/**
 * @description Sign in component
 * @class SignIn
 * @extends Component
 */
class SignIn extends Component {
  state = {
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
   * @method onChangeHandler
   * @param {*} event
   * @param {*} id
   * @return {Event} Change State on event
   */
  onChangeHandler = (event, id) => {
    const stateEventChange = { ...this.state.userForm };
    stateEventChange[id][id] = event.target.value;
    stateEventChange[id].touched = true;
    // validate
    FormValidator([id, stateEventChange]);
    // change state
    this.setState({ userForm: stateEventChange });
    // console.log(this.state.userForm);
  }
  /**
     * @description render Component
     * @return {jsx} jsx
     */
  render() {
    return (
      <Form
        userForm={this.state.userForm}
        changed={this.onChangeHandler}
        alt="Create an Account"
        status="New to Recipe"
        social="Log in with"
        link="/create"
      >
      Sign In
      </Form>
    );
  }
}

export default SignIn;
