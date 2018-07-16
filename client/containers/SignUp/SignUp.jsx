import React, { Component } from 'react';
import SignUpForm from '../../components/UI/Input/Input';
import FormHeader from '../../components/UI/Input/FormH';
import BtnContainer from '../../components/UI/Social/Container';
import CButton from '../../components/UI/CButton/CButton';
import Aux from '../../hoc/Auxs/Auxs';
import * as Regex from '../../validations/Regex';

/**
 * @description Sign in component
 * @class SignIn
 * @extends Component
 */
class SignUp extends Component {
  state = {
    // Authenticated: '',
    // userData: {
    //   name: '',
    //   username: '',
    //   email: '',
    //   password: ''
    // },
    userForm: {
      name: {
        name: '',
        type: 'text',
        icon: 'fas fa-user',
        elementConfig: {
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
        type: 'text',
        icon: 'fas fa-user-circle fa-1.5x',
        elementConfig: {
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
        type: 'text',
        icon: 'fas fa-envelope',
        elementConfig: {
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
        type: 'password',
        icon: 'fa fa-key',
        elementConfig: {
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
    this.validSignin([id, stateEventChange]);
    // change state
    this.setState({ userForm: stateEventChange });
    // console.log(this.state.userForm);
  }
  /**
 * @method validSignin
 * @param {Array} validate
 * @returns {js} validation
 */
  validSignin = (validate) => {
    const [id, eventHandler] = [...validate];
    let regex, test = /\s/gi;
    if (id === 'name') { regex = Regex.validName; test = Regex.nameTest; }
    if (id === 'username') { regex = Regex.validUsername; }
    if (id === 'email') { regex = Regex.validMail; }
    if (id === 'password') { regex = /[a-z][0-9]/gi; }
    const whiteSpace = (test).test(eventHandler[id][id]);
    if (whiteSpace) {
      eventHandler[id]
        .validation.InvalidMsg = eventHandler[id].validation.validMsg;
    } else {
      eventHandler[id]
        .validation.InvalidMsg = eventHandler[id].validation.fallbackMsg;
    }
    if (eventHandler[id].touched
      && eventHandler[id][id].length
      < eventHandler[id].elementConfig.minLength) {
      eventHandler[id].validation.isValid = false;
      eventHandler[id].isSuccess = false;
    }
    if (eventHandler[id].touched
      && eventHandler[id][id].length
      >= eventHandler[id].elementConfig.minLength) {
      eventHandler[id].validation.isValid = true;
      eventHandler[id].isSuccess = true;
      const boleanValue = eventHandler[id][id].match(regex);
      if (boleanValue && !whiteSpace) {
        eventHandler[id].validation.isValid = true;
        eventHandler[id].match = true;
        eventHandler[id].isSuccess = true;
      } else {
        eventHandler[id].validation.isValid = false;
        eventHandler[id].isSuccess = false;
      }
    }
  };
  /**
     * @description render Component
     * @return {jsx} jsx
     */
  render() {
    const formElementsArray = [];
    /* eslint-disable */
    for (let key in this.state.userForm) {
      formElementsArray.push({
        id: key,
        config: this.state.userForm[key]
      });
    };
    const form = (
      <FormHeader 
      footerLink='/checkin' 
      footerAction='Login Account'
      footerStatus='Already a member'>
        {
          formElementsArray.map(el => (
            <SignUpForm
              key={el.id}
              label={el.id}
              name={el.id}
              attributeType={el.config.type}
              attributeConfig={el.config.elementConfig}
              icon={el.config.icon}
              success={el.config.isSuccess}
              feedback={!this.state.userForm[el.id].validation.isValid ? el.config.validation.InvalidMsg : null}
              changed={(event) => this.onChangeHandler(event, el.id)} />
          ))
        }
        <BtnContainer socialStatus='Sign up with'/>
        <CButton>Create Account</CButton>
      </FormHeader>
    )
    return (
      <Aux>
        {form}
      </Aux>
    );
  }
}

export default SignUp;
