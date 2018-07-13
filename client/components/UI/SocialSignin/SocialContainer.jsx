import React from 'react';
import SocialSignin from './SocialSignin';
import classes from './SocialContainer.css';

/**
 * @description Social Signin
 * @function SocialSignin
 * @returns {JSX} jsx
 */
/* eslint-disable */
const SocialContainer = (props) => (
  <div className={['field', classes.JustifySpaceBtw].join(' ')}>
    <SocialSignin socialSymbol="fa-facebook-f">{props.socialStatus} </SocialSignin>
    <SocialSignin socialSymbol="fa-google-plus-g">{props.socialStatus} </SocialSignin>
  </div>
);

export default SocialContainer;
