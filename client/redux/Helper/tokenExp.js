import React, { Component } from 'react';
import jwt from 'jsonwebtoken';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { signOutAction } from '../actions/index';

/**
 * @function checkTokenExpiration
 *
 * @param {*} WrappedComponent
 *
 * @returns {data} dispatch
 */
const checkTokenExpiration = (WrappedComponent) => {
  /**
   * @class AuthenticateUser
   *
   * @classdesc authenticate user component
   *
   */
  class Authentication extends Component {
  /**
 * @function componentDidMount
 *
 * @returns {data} dispatch
 */
    componentDidMount() {
      const tokenSecret = process.env.JWT_SECRET;
      const token = localStorage.getItem('userToken');
      if (!token) {
        this.props.signOutAction();
      } else if (token) {
        jwt.verify(token, tokenSecret, (error, decoded) => {
          if (error || decoded.exp < (new Date().getTime() / 1000)) {
            this.props.signOutAction();
          }
        });
      }
    }

    /**
 * @function render
 *
 * @returns {*} WrappedComponent
 */
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  Authentication.propTypes = {
    signOutAction: propTypes.func.isRequired
  };

  return connect(null, { signOutAction })(Authentication);
};

export default checkTokenExpiration;
