import axios from 'axios';
import jwt from 'jsonwebtoken';
import * as actionTypes from '../constants/Signup';

/**
 * @function signinRequest
 * @param {*} userData
 * @returns {action} dispatch
 */
export const signupRequest = userData => ({
  type: actionTypes.SIGNUP_REQUEST,
  data: userData,
  isAuth: false
});

/**
 * @function onSignupSuccess
 * @param {*} userData
 * @param {*} resMsg
 * @returns {action} dispatch
 */
export const onSignupSuccess = (userData, resMsg) => ({
  type: actionTypes.SIGNUP_SUCCESS,
  data: userData,
  isAuth: true,
  responseMsg: resMsg
});

/**
 * @function onSignupFail
 * @param {*} error
 * @returns {data} dispatch
 */
export const onSignupFail = error => ({
  type: actionTypes.SIGNUP_FAIL,
  isAuth: false,
  errorMsg: error
});

/**
 * @function signupAction
 * @param {*} data
 * @returns {data} dispatch
 */
export const signupAction = data =>
  (dispatch) => {
    dispatch(signupRequest(data));
    return axios.post('/api/v1/users/signup', data)
      .then((res) => {
        const { message, token } = res.data;
        localStorage.setItem('userToken', token);
        const userInfos = jwt.decode(token);
        dispatch(onSignupSuccess(userInfos, message));
      })
      .catch((error) => {
        const errors = error.response.data;
        console.log('error', errors);
        dispatch(onSignupFail(errors));
      });
  };
