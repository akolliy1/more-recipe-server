import React from 'react';
import classes from './DropBtn.css';

/**
 * @description btn tip i
 * @function image
 * @param {*} Empty
 * @returns {JSX} jsx
 */
const DropBtn = () => (
  <div className={classes.DropBtn}>
    <button type="button" className="btn btn-default">
      <span className="badge badge-light">500k</span>
      <span className="sr-only">unread messages</span>
        Hits
    </button>
    <button type="button" className="btn btn-light ml-2">
      <span className="badge badge-light">0</span>
      <span className="sr-only">unread messages</span>
        Knock
    </button>
    <button type="button" className="btn btn-light ml-2">
      <span className="badge badge-light">30</span>
      <span className="sr-only">unread messages</span>
        comments
    </button>
  </div>
);

export default DropBtn;

