import React from 'react';

/**
 * @description jsx
 * @function modalBtn
 * @param {*} props
 * @return {jsx} jsx
 */
const modalBtn = props => (
  /* eslint-disable */
  <div className="modal-footer">
    <button
      type="button"
      className="btn btn-secondary"
      onClick={props.closed}
    >Close
    </button>
    <button
      type="submit"
      className="btn btn-primary"
    >Post
    </button>
  </div>
);


export default modalBtn;
