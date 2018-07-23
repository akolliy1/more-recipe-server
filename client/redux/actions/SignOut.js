import * as actionTypes from '../constants/SignOut';
import { signinRequest } from './Signin';
import setToken from '../Middleware/setToken';
/**
 * @function signinRequest
 * @param {*} userData
 * @returns {action} dispatch
 */
export const signOut = () => ({
  type: actionTypes.SIGNOUT_USER,
  data: {},
  isAuth: false,
});

/**
 * @function signinSuccess
 * @param {*} data
 * @returns {data} dispatch
 */
export const signOutAction = () =>
  (dispatch) => {
    localStorage.removeItem('userToken');
    setToken(false);
    dispatch(signinRequest({}));
    window.location('/');
  };
