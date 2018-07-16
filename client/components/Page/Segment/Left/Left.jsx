import React from 'react';
import Aux from '../../../../hoc/Auxs/Auxs';
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
  <Aux>
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
              
              <Active />
              {/* { props.children } */}

              {/* eslint-enable */}
            </div>
          </div>

        </div>
      </div>
    </aside>
  </Aux>
);

export default left;
