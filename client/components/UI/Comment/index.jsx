import React from 'react';
import Fastfood from '../../../assets/Images/Fast-food-img-1.jpg';
import classes from './Comment.css';

/**
 * @description Comment
 * @function Comment
 * @param {*} Empty
 * @returns {JSX} jsx
 */
const index = () => (
  /* eslint-disable */
  <div className="event">
    <div className="label">
      <img src={Fastfood} alt="comment Avart" />
    </div>
    <div className="content">
      <div className="summary">
        <a href="/recipe">Joe Henderson</a> posted on his page
        <div className="date">
            3 days ago
        </div>
      </div>
      <div className={['extra text', classes.Comment].join(' ')}>
         Ours is a life of constant reruns.
         We're always circling back to where we'd we started,
         then starting all over again. Even if we don't run
         extra laps that day, we surely will come back
         for more of the same another
         day soon.
      </div>
      <div className="meta">
        <a href="/recipe" className="like">
          <i className="like icon" /> 5 Likes
        </a>
      </div>
    </div>
  </div>
);

export default index;

