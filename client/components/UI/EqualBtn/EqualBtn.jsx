import React from 'react';
import classes from './EqualBtn.css';
/**
 * @description for the top post link
 * @function equalBtn
 * @param {*} props
 * @returns {JSX} jsx
 */
/* eslint-disable */
const equalBtn = props => (
  <a
    href={props.href}
    className={["col-md-6 col", classes.Item].join(' ')}
    data-toggle="modal"
    data-target="#recipeModal"
  >
    <span className="pr-2 click fas fa-pen-square color" />

    { props.children }

    {/* eslint-enable */}
  </a>
);

export default equalBtn;
