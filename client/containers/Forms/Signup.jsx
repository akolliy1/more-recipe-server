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
        status="Already a member"
        alt="Login Account"
        social="Sign up with"
        link="/checkin"
      >
      Create Account
      </Form>
    );
  }
}

export default SignIn;
