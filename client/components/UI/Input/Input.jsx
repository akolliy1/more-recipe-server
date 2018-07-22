import React from 'react';
import classes from './Input.css';
import Tips from '../Tips/Btn';
import Aux from '../../../hoc/Auxs/Auxs';

/**
 * @description input Sign in form
 * @function inputForm
 * @param {*} props
 * @returns {JSX} jsx
 */
const inputForm = (props) => {
  /* eslint-disable */
  let color = classes.InputIcon;
  if (props.success) {
    color = classes.IsSuccess
  }
  let Input = null;
  let inputColor = props.hasIcon ? "input is-success" : classes.Input

  switch (props.attributeType) {
    case 'Cinput':
      Input = (
        <input
          className={classes.Input}
          name={props.name}
          {...props.attributeConfig}
          onChange={props.changed}
          required
        />
      );
      break;
    case 'textarea':
      Input = (
        <textarea
          name={props.name}
          {...props.attributeConfig}
          onChange={props.changed}
          onClick={props.clicked}
        />
      );
      break;
    case 'file':
      Input = (
        <input
          name={props.name}
          {...props.attributeConfig}
          onClick={props.changed}
        />
      );
      break;
    default:
      Input = (
        <input
          className={inputColor}
          name={props.name}
          value={props.value}
          {...props.attributeConfig}
          onChange={props.changed}
          required
        />
      );
      break;
  }
  return (
    <div className="field">

      <label
        className={["label", classes.Capitalize].join(' ')}>
        {props.label}
        {props.tips? <Tips />: null}
      </label> {/* props expected on label and input below */}

      {
      props.important? <div className="control has-icons-left has-icons-right">
        {Input} {/* this is the dynamic input element */}
        {
          props.hasIcon? <Aux>
           <span className="icon is-small is-left">
             <i className={[color, props.icon].join(' ')} /> {/* props expected */}
           </span>
           <span className="icon is-small is-right">
             <i className={["fas fa-check", color].join(' ')} />
           </span>
          </Aux>: null
        }
      </div> : Input
      }

      <p className="help is-success" />
      <p className="help is-danger">{props.feedback}</p>

    </div>
  );
};

export default inputForm;
