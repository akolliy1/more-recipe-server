import axios from 'axios';
import jwt from 'jsonwebtoken';
import * as actionTypes from '../constants/SignIn';
import setToken from '../Middleware/setToken';

/**
 * @function signinRequest
 * @param {*} userData
 * @returns {action} dispatch
 */
export const signinRequest = userData => ({
  type: actionTypes.SIGNIN_SUCCESS,
  data: userData,
  isAuth: false,
  loading: true
});

/**
 * @function onSigninSuccess
 * @param {*} userData
 * @param {*} resMsg
 * @returns {action} dispatch
 */
export const onSigninSuccess = (userData, resMsg) => ({
  type: actionTypes.SIGNIN_SUCCESS,
  data: userData,
  isAuth: true,
  loading: false,
  responseMsg: resMsg
});

/**
 * @function onSigninFail
 * @param {*} error
 * @returns {data} dispatch
 */
export const onSigninFail = error => ({
  type: actionTypes.SIGNIN_FAIL,
  isAuth: false,
  loading: false,
  errorMsg: error
});

/**
 * @function signinSuccess
 * @param {*} data
 * @returns {data} dispatch
 */
export const signinAction = data =>
  (dispatch) => {
    dispatch(signinRequest(data));
    return axios.post('/api/users/signin', data)
      .then((res) => {
        const { message, token } = res.data;
        setToken(token);
        const checkToken = localStorage.getItem('userToken');
        if (checkToken) {
          const userInfos = jwt.decode(token);
          return dispatch(onSigninSuccess(userInfos, message));
        }
        localStorage.setItem('userToken', token);
        const userInfos = jwt.decode(token);
        return dispatch(onSigninSuccess(userInfos, message));
      })
      .catch((error) => {
        const errors = error.response.data;
        dispatch(onSigninFail(errors));
      });
  };
