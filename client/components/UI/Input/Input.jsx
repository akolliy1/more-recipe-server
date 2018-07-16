import React from 'react';
import classes from './Input.css';

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
  switch (props.attributeType) {
    case 'Custominput':
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
          className="input is-success"
          type="text"
          {...props.attributeConfig}
          onChange={props.changed}
          required
        />
      );
      break;
  }
  return (
    <div className="field">
      <label className={["label", classes.Capitalize].join(' ')}>{props.label}</label> {/* props expected on label and input below */}
      <div className="control has-icons-left has-icons-right">
        {Input} {/* this is the dynamic input element */}
        <span className="icon is-small is-left">
          <i className={[color, props.icon].join(' ')} /> {/* props expected */}
        </span>
        <span className="icon is-small is-right">
          <i className={["fas fa-check", color].join(' ')} />
        </span>
      </div>
      <p className="help is-success" />
      <p className="help is-danger">{props.feedback}</p>
    </div>
  );
};

export default inputForm;
