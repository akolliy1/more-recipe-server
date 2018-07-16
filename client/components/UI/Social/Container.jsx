import React from 'react';
import SocialSignin from './SocialBtn';
import classes from './Container.css';

/**
 * @description Social Network Signin
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
