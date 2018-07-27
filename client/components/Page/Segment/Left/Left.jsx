import React from 'react';
import Active from './Active/Active';
// import classes from './Left.css';

/**
 * @function recipe
 * @param {*} props
 * @returns {JSX} jsx
 */
/* eslint-disable */
const left = props => (
    /* eslint-enable */
  <aside className="col-md-2 mb-2">
    <div className="card">
      <div className="card-body">
        <div className="menu">
          <div className="item">
            <div className="header">
              <i className="ui green empty circular label pr-2" />
              <span> Online freinds </span>
            </div>
          </div>
          <div className="dropdown-divider" />

          <div className="ui middle aligned animated list">
            {/* eslint-disable */}
              
              <Active image={props.image} username={props.username}/>
              {/* { props.children } */}

              {/* eslint-enable */}
          </div>
        </div>

      </div>
    </div>
  </aside>
);

export default left;
