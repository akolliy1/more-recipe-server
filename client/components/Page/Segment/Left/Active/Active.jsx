// this shows online friends
import React from 'react';
import propTypes from 'prop-types';
import userPic from '../../../../../assets/Images/person-1.jpg';
import classes from './Active.css';

/**
 * @function recipe
 * @param {*} props
 * @returns {JSX} jsx
 */
const left = props => (
  <div className="item">
    <img
      className={['ui avatar image',
    classes.Active].join(' ')}
      src={props.image ? props.image : userPic}
      alt="onlinfrnd"
    />
    <div className="content">
      <div className="header">{ props.username }</div>
    </div>
  </div>
);

left.defaultProps = {
  image: userPic
};

left.propTypes = {
  image: propTypes.string,
  username: propTypes.string.isRequired
};

export default left;
