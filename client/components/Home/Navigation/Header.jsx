import React from 'react';
import classes from './Header.css';

/**
 * @description Header component
 * @function Header
 * @returns {JSX} jsx
 */
const navigation = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
      <div className="navbar-header">
        <a
          href="/"
          className={[classes.Navbrand,
        classes.Uppercase].join(' ')}
        >
        Akool
        </a>
      </div>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        /* eslint-disable */
        aria-controls="navbarSupportedContent"
        /* eslint-enable */
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div
        className={['collapse navbar-collapse',
      classes.TopDivContainer].join(' ')}
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a
              href="/"
              className={['nav-link nav-text',
              classes.Link,
              classes.Uppercase].join(' ')}
            >Recipes
            </a>
          </li>
          <li className="nav-item">
            <a
              href="/"
              className={['nav-link nav-text',
          classes.Uppercase].join(' ')}
            >
              <i className={['fa fa-bold ', classes.NavIcon].join(' ')} />
              log
            </a>
          </li>
          <li className="nav-item">
            <a
              href="/"
              className={['nav-link nav-text',
              classes.HeaderLinkSpace, classes.Uppercase].join(' ')}
            >
              <span className={['fas fa-th ',
                classes.HeaderLinkSpace].join(' ')}
              />categories
            </a>
          </li>
        </ul>
        <div className={['navbar-nav center', classes.SearchFormDiv].join(' ')}>
          <form
            method="get"
            className="form-inline my-2 my-lg-0"
            id="search"
          >
            <input
              type="search"
              className={['form-control mr-sm-2',
              classes.SearchInput].join(' ')}
              name="search-recipe"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </div>

        <ul className="nav navbar-nav navbar-right clear">

          <li className="nav-item">
            <a
              href="/create"
              className={['nav-link nav-text',
              classes.HeaderLinkSpace,
              classes.Uppercase].join(' ')}
            >
              <span className={['far fa-user',
              classes.HeaderLinkSpace].join(' ')}
              />
            create
            </a>
          </li>

          <li
            className="nav-item"
          >
            <a
              href="/checkin"
              className={['nav-link nav-text',
          classes.HeaderLinkSpace,
          classes.Uppercase].join(' ')}
            >
              <span className={['fas fa-sign-in-alt',
                classes.HeaderLinkSpace].join(' ')}
              />
          signin
            </a>
          </li>
        </ul>
      </div>

    </div>
  </nav>
);


export default navigation;
