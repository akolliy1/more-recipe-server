import React, { Component } from 'react';
import Form from './index';
import recipeValidator from '../../../validations/FormValidator';
import ModalBtn from '../ModalBtn/ModalBtn';
import AModalBtn from '../ModalBtn/AModalBtn';
import ModalH from '../ModalH/ModalH';
import EqualBtn from '../EqualBtn/EqualBtn';
// import {  } from "module";

/**
 * @description Sign in component
 * @class RecipeForm
 * @param {*} props
 * @return {class} JSX
 */
class RecipeForm extends Component {
  state = {
    clicked: false,
    showModal: true,
    recipeForm: {
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
  /**
   * @method shouldComponentUpdate
   * @param {*} nextProps
   * @param {*} nextState
   * @return {Event} Change State on event
   */
  shouldComponentUpdate(nextProps, nextState) {
    const boleanValue = this.props !== nextProps || this.state !== nextState;
    return boleanValue;
  }
  onOpenCloseModalHandler = () => {
    this.setState(prevState => ({
      clicked: !prevState.clicked,
      show: !prevState.showModal
    }));
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
    const stateEventChange = { ...this.state.recipeForm };
    stateEventChange[id][id] = event.target.value;
    stateEventChange[id].touched = true;
    // validate
    recipeValidator([id, stateEventChange]);
    // change state
    this.setState({ recipeForm: stateEventChange });
    // console.log(this.state.recipeForm);
  }
  /**
     * @description render Component
     * @return {jsx} jsx
     */
  render() {
    const form = window.innerWidth && !this.state.clicked ?
      (
        <form action="" method="post">
          <div className="ui form">
            <Form
              recipeForm={this.state.recipeForm}
              changed={this.onChangeHandler}
              clicked={this.onClickedHandler}
              isClicked={this.state.clicked}
            />
          </div>
          <AModalBtn />
        </form>
      ) :
      (
        <ModalH
          show={this.state.clicked}
          title="Post Recipe"
          modalClosed={this.onOpenCloseModalHandler}
        >
          <form action="" method="post">
            <div className="ui form">
              <Form
                recipeForm={this.state.recipeForm}
                changed={this.onChangeHandler}
                clicked={this.onClickedHandler}
                isClicked={this.state.clicked}
              />
            </div>
            <ModalBtn closed={this.onOpenCloseModalHandler} />
          </form>
        </ModalH>
      );
    return (
      <div className="card">
        <div className="card-body">
          <div className="row">
            <EqualBtn href="/" title="Recipe" />
            <EqualBtn href="/" title="Photos" />
          </div>
          <hr />
          {form}
        </div>
      </div>

    );
  }
}

export default RecipeForm;
