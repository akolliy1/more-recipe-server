import React from 'react';
import classes from './Header.css';
import userPics from '../../../assets/Images/person-1.jpg';
/**
 * @function recipe
 * @param {*} props
 * @returns {JSX} jsx
 */
/* eslint-disable */
const recipe = props => (
    /* eslint-enable */
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
      <a href="/" className={['navbar-brand', classes.Color].join(' ')}>Akool</a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarProfile"
                /* eslint-disable */
                aria-controls="navbarProfile"
                /* eslint-enable */
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarProfile">
        <ul className="navbar-nav mr-auto">
          <li className={['nav-item', classes.HeaderActive].join(' ')}>
            <a href="/profile" className="nav-link">
              <div className="menu" title="profile">
                <div className={['item', classes.Color].join(' ')} data-value="jenny">
                  <img className="ui mini avatar image" src={userPics} alt="userPics" />
                  <span>Jenny Hess</span>
                </div>
              </div>
              <span className="sr-only">(current)</span>
            </a>
          </li>
        </ul>
        <div className="navbar-nav navbar-right">
          <li className="nav-item mr-5">
            <a href="/" className={['nav-link', classes.Color].join(' ')}>Home</a>
          </li>
          <li className="nav-item" title="friends">
            <a href="/" className="nav-link">
              <span className={['fas fa-user-friends', classes.HeaderSize, classes.Color].join(' ')} />
            </a>
          </li>
          <li className="nav-item" title="Messages">
            <a href="/" className="nav-link">
              <span className={['far fa-comment', classes.HeaderSize, classes.Color].join(' ')} />
            </a>
          </li>
          <li className="nav-item" title="Notifications">
            <a href="/" className="nav-link">
              <span className={['far fa-dot-circle', classes.HeaderSize, classes.Color].join(' ')} />
              <span className={classes.HeaderNotification}>242</span>
            </a>
          </li>
          <li className="nav-item dropdown">
            <a
              className={['nav-link dropdown-toggle', classes.Color].join(' ')}
              href="/"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
                Sign Out
            </a>
            {/* eslint-disable */}
            <div className="dropdown-menu" aria-labelledby="navbarDropdown" data-placement="top">
              {/* eslint-enable */}
              <div className="menu">
                <div className="item" data-value="jenny">
                  <img className="ui mini avatar image" src={userPics} alt="userSignPics" /> Jenny Hess
                </div>
              </div>
              <div className="dropdown-divider" />
              <a className="dropdown-item" href="/Logout"> Log Out</a>
              <div className="dropdown-divider" />
              <a className="dropdown-item" href="/"> Help</a>
              <a className="dropdown-item" href="/"> Favorite</a>
              <div className="dropdown-divider" />
              <a className="dropdown-item" href="/"> Settings</a>
            </div>
          </li>
        </div>
      </div>
    </div>

  </nav>
);

export default recipe;
