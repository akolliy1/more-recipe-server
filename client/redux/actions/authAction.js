import axios from 'axios';
import jwt from 'jsonwebtoken';
import * as actionTypes from '../constants/authConst';
import setToken from '../Middleware/setToken';

const url = '/api/v1/users/';

/**
 * @function requestCurrentUser
 * @param {*} userData
 * @returns {action} dispatch
 */
export const requestCurrentUser = userData => ({
  type: actionTypes.REQUEST_CURRENT_USER,
  data: userData,
  isAuth: false,
  loading: true
});

/**
 * @function setCurrentUser
 * @param {*} userData
 * @param {*} resMsg
 * @returns {action} dispatch
 */
export const setCurrentUser = (userData, resMsg) => ({
  type: actionTypes.SET_CURRENT_USER,
  data: userData,
  isAuth: true,
  loading: false,
  responseMsg: resMsg
});

/**
 * @function removeCurrentUser
 * @param {*} error
 * @returns {data} dispatch
 */
export const removeCurrentUser = error => ({
  type: actionTypes.REMOVE_CURRENT_USER,
  isAuth: false,
  loading: false,
  errorMsg: error
});

/**
 * @function signInAction
 *
 * @param {*} data
 *
 * @returns {data} dispatch
 */
export const signInAction = data =>
  (dispatch) => {
    dispatch(requestCurrentUser(data));
    axios.post(`${url}signin`, data)
      .then((res) => {
        const { message, token } = res.data;
        setToken(token);
        localStorage.setItem('userToken', token);
        const userInfo = jwt.decode(token);
        dispatch(setCurrentUser(userInfo, message));
      }).catch((err) => {
        const errData = err.response.data;
        dispatch(removeCurrentUser(errData));
      });
  };

  /**
 * @function signUpAction
 *
 * @param {*} data
 *
 * @returns {data} dispatch
 */
export const signUpAction = data =>
  (dispatch) => {
    dispatch(requestCurrentUser(data));
    axios.post(`${url}signup`, data)
      .then((res) => {
        const { message, token } = res.data;
        setToken(token);
        const userInfo = jwt.decode(token);
        dispatch(setCurrentUser(userInfo, message));
      }).catch((err) => {
        const errData = err.response.data;
        dispatch(removeCurrentUser(errData));
      });
  };
