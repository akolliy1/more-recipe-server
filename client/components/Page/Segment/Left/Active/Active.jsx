// this shows online friends
import React from 'react';
import userPic from '../../../../../assets/Images/person-1.jpg';
import classes from './Active.css';

/**
 * @function recipe
 * @param {*} props
 * @returns {JSX} jsx
 */
/* eslint-disable */
const left = props => (
    /* eslint-enable */
  <div className="item">
    <img
      className={['ui avatar image',
    classes.Active].join(' ')}
      src={userPic}
      alt="onlinfrnd"
    />
    <div className="content">
      <div className="header">Helen</div>
    </div>
  </div>
);

export default left;
