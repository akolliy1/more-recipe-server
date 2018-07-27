import * as actionTypes from '../constants/authConst';
import setToken from '../Middleware/setToken';
/**
 * @function signinRequest
 * @param {*} userData
 * @returns {action} dispatch
 */
export const signOutRequest = () => ({
  type: actionTypes.SIGNOUT_USER,
  responseMsg: 'SignOut succefully',
  data: {},
  loading: false,
  isAuth: false,
});

/**
 * @function signOutSuccess-Action
 * @param {*} data
 * @returns {data} dispatch
 */
export const signOutAction = () =>
  (dispatch) => {
    localStorage.removeItem('userToken');
    setToken(false);
    dispatch(signOutRequest({}));
    window.location('/checkin');
  };
