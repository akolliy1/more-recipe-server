import React, { Component } from 'react';
import SignInForm from '../../components/UI/Input/InputForm';
import HeaderForm from '../../components/UI/Input/HeaderForm';
import SocialContainer from '../../components/UI/SocialSignin/SocialContainer';
import CustomButton from '../../components/UI/CustomButton/CustomButton';
import Aux from '../../hoc/Auxs/Aux';
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
          validMsg: 'no spacing character eg Sirkool',
          InvalidMsg: 'Your Username must be atleast 3 characters'
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
          validMsg: 'no spacing character eg sirkolliy12',
          InvalidMsg: 'Your password must be atleast 8 characters'
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
    if (id === 'username') { regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:[a-z])/ig; }
    if (id === 'password') { regex = /[a-z][0-9]/gi; }
    if (eventHandler[id].touched && eventHandler[id][id].length < eventHandler[id].elementConfig.minLength) {
      eventHandler[id].validation.isValid = false;
      eventHandler[id].isSuccess = false;
    }
    if (eventHandler[id].touched && eventHandler[id][id].length >= eventHandler[id].elementConfig.minLength) {
      eventHandler[id].validation.isValid = true;
      eventHandler[id].isSuccess = true;
      const boleanValue = eventHandler[id][id].match(regex);
      const whiteSpace = (test).test(eventHandler[id][id]);
      if (boleanValue && !whiteSpace) {
        eventHandler[id].validation.isValid = true;
        eventHandler[id].match = true;
        eventHandler[id].isSuccess = true;
      } else {
        eventHandler[id].validation.isValid = false;
        eventHandler[id].isSuccess = false;
        eventHandler[id].validation.InvalidMsg = eventHandler[id].validation.validMsg;
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
      <HeaderForm
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
        <SocialContainer socialStatus='Log in with' />
        <CustomButton>Sign In</CustomButton>
      </HeaderForm>
    )
    return (
      <Aux>
      { form }
      </Aux>
    );
  }
}

export default SignIn;
