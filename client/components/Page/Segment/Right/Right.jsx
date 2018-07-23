import React from 'react';
import RFooter from './Footer/RFooter';
import Stories from './Stories/Stories';
import Dot from "../../../UI/Icons/Dot/Dot";

/**
 * @function recipe
 * @param {*} props
 * @returns {JSX} jsx
 */
/* eslint-disable */
const right = props => (
    /* eslint-enable */
  <aside className="col-md-3 col margin-top">
    <div className="card">
      <div className="card-body">
        <div className="justify-center">
          <div className="row">
            <div className="col">
              <span className="click" />
                 Stories
            </div>
            <div className="col">
              <span
                className="only-me color"
                style={{ float: 'right', cursor: 'pointer' }}
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              ><Dot />
              </span>
              {/* eslint-disable */}
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                {/* eslint-enable */}
                <a className="dropdown-item" href="/">Today</a>
                <a className="dropdown-item" href="/">This week</a>
                <a className="dropdown-item" href="/">This month</a>
              </div>
            </div>
          </div>
        </div>
        <hr />
        {/* eslint-disable */} 
            <Stories />
        {/* { props.children } */}

        {/* eslint-enable */}
      </div>
    </div>
    <RFooter />
  </aside>
);

export default right;
