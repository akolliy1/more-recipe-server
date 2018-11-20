import React from 'react';
import classes from './Stories.css';
import userPic from '../../../../../assets/Images/Fast-food-img-1.jpg';

/**
 * @function rightChild
 * @param {*} props
 * @returns {JSX} jsx
 */
/* eslint-disable */
const rightChild = props => (
    /* eslint-enable */
  <div className="ui feed">
    <div className="event">
      <div className="label">
        <img src={userPic} className={classes.SmallPics} alt="userPic" />
      </div>
      <div className="content">
        <div className="summary">
          <a className="user" href="/">
            Elliot Fu
          </a> added you as a friend
          <div className="date">
                    1 Hour Ago
          </div>
        </div>
        <div className="meta">
          <a className="like" href="/">
            <i className="like icon" /> 4 Likes
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default rightChild;
