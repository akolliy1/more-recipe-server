import React, { Component } from 'react';
import SignInForm from '../../components/UI/Input/Input';
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
class SignIn extends Component {
  state = {
    userForm: {
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
    let regex; const test = /\s/gi;
    if (id === 'username') { regex = Regex.validUsername; }
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
        footerLink='/create'
        footerAction='Create an Account'
        footerStatus='New to Recipe'>
        {
          formElementsArray.map(el => (
            <SignInForm
              key={el.id}
              label={el.id}
              attributeType={el.config.type}
              attributeConfig={el.config.elementConfig}
              icon={el.config.icon}
              success={el.config.isSuccess}
              feedback={!this.state.userForm[el.id].validation.isValid? el.config.validation.InvalidMsg: null}
              changed={(event) => this.onChangeHandler(event, el.id)} />
          ))
        }
        <BtnContainer socialStatus='Log in with' />
        <CButton>Sign In</CButton>
      </FormHeader>
    )
    return (
      <Aux>
      { form }
      </Aux>
    );
  }
}

export default SignIn;
