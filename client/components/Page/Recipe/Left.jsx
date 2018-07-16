import React from 'react';
// import classes from './Recipe.css';

/**
 * @function recipe
 * @param {*} props
 * @returns {JSX} jsx
 */
/* eslint-disable */
const right = props => (
    /* eslint-enable */
  <aside className="col-md-3 mb-2">
    <div className="card">
      <div className="card-body">
        <div className="ui vertical menu">
          <a className="item" href="/">
                Home
          </a>

          <div
            className="ui left pointing dropdown link item btn-group dropright"
          >
            <span
              className="dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Messages
              <i className="icon pr-5 pl-5" />
            </span>

            <div className="dropdown-menu">
              <div className="dropdown-item">
                <i className="ui green empty circular label" />
                    Online freinds
              </div>
              <div className="dropdown-divider" />
              <div className="dropdown-item">Inbox</div>
              <div className="dropdown-item">Starred</div>
              <div className="dropdown-item">Sent Mail</div>
              <div className="dropdown-item">Drafts (143)</div>
              <div className="dropdown-divider" />
              <div className="dropdown-item">Spam (1009)</div>
              <div className="dropdown-item">Trash</div>
            </div>
          </div>
          <a className="item" href="/">
                Browse
          </a>
          <a className="item" href="/">
                Help
          </a>
        </div>

        <div className="ui labeled icon top right pointing dropdown button">
          <i className="filter icon" />
          <span
            className="text only-me"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
          Filter Posts
          </span>
          <div className="dropdown-menu">
            <div className="dropdown-item">
              <div className="ui search icon input">
                <i className="search icon" />
                <input
                  type="text"
                  name="search"
                  placeholder="Search issues..."
                />
              </div>
            </div>
            <div className="dropdown-divider" />
            <div className="dropdown-item mb-2">
              <div className="header">
                <i className="tags icon" />
                    Filter by tag below
              </div>
            </div>
            <div className="dropdown-item">
              <div className="item">
                <div className="ui red empty circular label" />
                    Important
              </div>
            </div>
            <div className="dropdown-item">
              <div className="item">
                <div className="ui blue empty circular label" />
                    Announcement
              </div>
            </div>
            <div className="dropdown-item">
              <div className="item">
                <div className="ui black empty circular label" />
                    Discussion
              </div>
            </div>
            <div className="dropdown-divider" />
            <div className="dropdown-item mb-2">
              <div className="header">
                <i className="calendar icon" />
                    Filter by date below
              </div>
            </div>
            <div className="dropdown-item">
              <div className="item">
                <i className="olive circle icon" />
                    This Week
              </div>
            </div>
            <div className="dropdown-item">
              <div className="item">
                <i className="violet circle icon" />
                    This Month
              </div>
            </div>
            <div className="dropdown-item">
              <div className="item">
                <i className="orange circle icon" />
                    This Year
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
);

export default right;
