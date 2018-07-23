import React from 'react';
import Avatar from '../Avatar/Avatar';
import Meta from '../Meta/Meta';
import Image from '../Image/Image';
import CardBtn from '../Card/CardBtn';
import DropBtn from '../Card/DropBtn';
import Comment from '../Comment/Comment';
import classes from './Post.css';
/**
 * @description btn tip i
 * @function Post
 * @param {*} Empty
 * @returns {JSX} jsx
 */
const post = () => (
  <div className="card mt-2 mb-2">
    <div className="card-body">
      <div className="menu">
        <div className="item" data-value="jenny">
          <Avatar />
          <Meta />
          <Image />
          <div className={classes.Clear} />
          <CardBtn />
          <div className={['card-footer', classes.Post].join(' ')}>
            <DropBtn />
            <Comment />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default post;
