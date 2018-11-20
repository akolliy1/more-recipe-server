import React from 'react';
import Dot from '../Icons/Dot/Dot';
import person from '../../../assets/Images/person-1.jpg';
import classes from './Avatar.css';

/**
 * @description small image and user's name
 * @function Avatar
 * @param {*} Empty
 * @returns {JSX} jsx
 */
const Avatar = () => (
  /* eslint-disable */
  <div className={classes.AvatarRow}>
    <div className={classes.AvatarCol1}>
      <img
        className={['ui mini avatar image', classes.Avatar].join(' ')}
        src={person}
        alt="Avatar"
      />
      <a href="/recipe" className="user">Jenny Hess</a>
      <span className="pl-1 pr-1">and</span>
      <a href="/recipe" className="second-user">akolliy</a>
    </div>
    <div className={[classes.AvatarCol2, 'dropdown no-border'].join(' ')}>
      <span
        className={['only-me', classes.Color].join(' ')}
        style={{ float: 'right', cursor: 'pointer' }}
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <Dot />
      </span>
      <div
        className="dropdown-menu dropdown-menu-right"
        aria-labelledby="dropdownMenuButton"
      >
        <a className="dropdown-item" href="/recipe">Hide</a>
        <a className="dropdown-item" href="/recipe">add favorite</a>
        <a className="dropdown-item" href="/recipe">view</a>
      </div>
    </div>
  </div>

);

export default Avatar;
