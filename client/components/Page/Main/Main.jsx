import React from 'react';
import Recipe from '../../UI/Recipe/Recipe';
import Post from '../../UI/Post/Post';
// import classes from './Left.css';

/**
 * @function Main
 * @param {*} props
 * @returns {JSX} jsx
 */
/* eslint-disable */
const Main = () => (
    /* eslint-enable */
  <article className="col-md-7">
    <Recipe />
    <Post />
  </article>);

export default Main;
