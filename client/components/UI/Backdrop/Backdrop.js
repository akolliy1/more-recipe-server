import React from 'react';
import classes from './Backdrop.css';

/**
 * @description backdrop
 * @function Backdrop
 * @param {*} props
 * @returns {JSX} jsx
 */
/* eslint-disable */
const backDrop = props => (
  props.show ? <div
    className={classes.Backdrop}
    onClick={props.clicked}
  /> : null
);

export default backDrop;
