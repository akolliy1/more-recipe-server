import React from 'react';
import classes from './SocialBtn.css';

/**
 * @description input Checkbox
 * @function inputCheckbox
 * @param {*} props
 * @returns {JSX} jsx
 */
const SocialSignin = props => (
  /* eslint-disable */
  <a className={[classes.SocialBtn, "mr-1"].join(' ')} href="/" role="button">
    {props.children}
    <span className={['fab', props.socialSymbol].join(' ')} />
  </a>
  /* eslint-enable */
);

export default SocialSignin;
