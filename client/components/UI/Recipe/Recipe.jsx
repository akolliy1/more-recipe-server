import React, { Component } from 'react';
import Form from './index';
import * as Regex from '../../../validations/Regex';
/**
 * @description Sign in component
 * @class SignIn
 * @extends Component
 */
class RecipeForm extends Component {
  state = {
    clicked: false,
    userForm: {
      'Recipe name': {
        recipe: '',
        type: 'input',
        important: false,
        icon: 'fas fa-user-circle fa-1.5x',
        elementConfig: {
          type: 'text',
          placeholder: 'e.g French soup',
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
      description: {
        description: '',
        type: 'input',
        important: false,
        icon: 'fa fa-key',
        elementConfig: {
          type: 'text',
          placeholder: "what's the description e.g Pounded Yam and, Just the way you like it ",
          minLength: 4
        },
        touched: false,
        match: false,
        isSuccess: false,
        validation: {
          isValid: true,
          validMsg: 'Atmost a whitespace eg Pounded Yam',
          InvalidMsg: 'Must be Atleast 4 characters',
          fallbackMsg: 'Must be Atleast 4 characters'
        }
      },
      ingredients: {
        ingredients: '',
        type: 'textarea',
        important: true,
        icon: 'fas fa-user-circle fa-1.5x',
        elementConfig: {
          rows: 4,
          placeholder: 'what are your Recipe Ingredients?e,g Yam;;Vagetable;;water e.t.c',
          minLength: 4
        },
        touched: false,
        match: false,
        isSuccess: false,
        validation: {
          isValid: true,
          validMsg: 'No whitespace eg Yam;;Vagetable;;water',
          InvalidMsg: 'Must be Atleast 4 characters',
          fallbackMsg: 'Must be Atleast 4 characters'
        }
      },
      procedure: {
        procedure: '',
        type: 'textarea',
        important: false,
        icon: 'fas fa-user-circle fa-1.5x',
        elementConfig: {
          rows: 4,
          placeholder: 'what\'s your Recipe Procedure ?',
          minLength: 4
        },
        touched: false,
        match: false,
        isSuccess: false,
        validation: {
          isValid: true,
          validMsg: 'No whitespace eg Yam;;Vagetable;;water',
          InvalidMsg: 'Must be Atleast 4 characters',
          fallbackMsg: 'Must be Atleast 4 characters'
        }
      },
      image: {
        image: '',
        type: 'file',
        important: false,
        icon: 'fas fa-user-circle fa-1.5x',
        elementConfig: {
          type: 'file',
          accept: 'image/*'
        },
        touched: false,
        match: false,
        isSuccess: false,
        validation: {
          isValid: true,
          validMsg: 'No whitespace eg Yam;;Vagetable;;water',
          InvalidMsg: 'Must be Atleast 4 characters',
          fallbackMsg: 'Must be Atleast 4 characters'
        }
      }
    }
  }
  onClickedHandler = () => {
    this.setState(prevState => ({ clicked: !prevState.clicked }));
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
    return (
      <Form
        userForm={this.state.userForm}
        changed={this.onChangeHandler}
        clicked={this.onClickedHandler}
        isClicked={this.state.clicked}
      />
    );
  }
}

export default RecipeForm;
