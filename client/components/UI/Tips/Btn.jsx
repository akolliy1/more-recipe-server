import React from 'react';

/**
 * @description btn tip i
 * @function Post
 * @param {*} Empty
 * @returns {JSX} jsx
 */
const btn = () => (
  <button
    type="button"
    className="fas fa-info btn btn-default"
    data-container="field"
    data-toggle="popover"
    data-placement="top"
    data-content="Vivamus sagittis
        lacus vel augue laoreet rutrum faucibus."
  />
);

export default btn;
