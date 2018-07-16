import React from 'react';

/**
 * @description input Checkbox
 * @function inputCheckbox
 * @param {*} props
 * @returns {JSX} jsx
 */
const SocialSignin = props => (
  /* eslint-disable */
  <a className="btn btn-primary mr-1" href="/" role="button">
    {props.children}
    <span className={['fab', props.socialSymbol].join(' ')} />
  </a>
  /* eslint-enable */
);

export default SocialSignin;
