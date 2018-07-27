import React from 'react';

/**
 * @description custom Button
 * @function customButton
 * @param {*} props
 * @returns {JSX} jsx
 */
const customButton = props => (
  <div className="field">
    {/* eslint-disable */}
    <button onClick={props.clicked} className="btn btn-primary col-md-12 mt-2" disabled={props.isActive}>{props.children}</button>
    {/* eslint-enable */}
  </div>
);

export default customButton;
