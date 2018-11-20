import React from 'react';
import classes from './Comment.css';
import Index from './index';

/**
 * @description Comment
 * @function Comment
 * @param {*} Empty
 * @returns {JSX} jsx
 */
const comment = () => (
  /* eslint-disable */
  <div className={['ui feed', classes.CommentRow].join(' ')}>
    <Index />
  </div>
);

export default comment;

