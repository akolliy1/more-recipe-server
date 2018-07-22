import React from 'react';

/**
 * @description jsx
 * @function AModalBtn
 * @param {*} props
 * @return {jsx} jsx
 */
const AModalBtn = props => (
  /* eslint-disable */
  <button
    type="submit"
    className="btn btn-primary"
    onClick={props.post}
  >Post
  </button>
);


export default AModalBtn;
