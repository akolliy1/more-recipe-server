import * as actionTypes from '../constants/SignIn';
import updated from '../helper';

const initialState = {
  userData: {
    username: '',
    password: ''
  },
  isAuthenticated: false,
  responseMessage: '',
  errorMessage: ''
};

/**
 * @function signinRequest
 * @param {*} state
 * @param {*} action
 * @returns {object} object
 */
const signupRequest = (state, action) => {
  const userInput = { ...action.data };

  const userUpdate = updated(state.userData, userInput);

  const userAuth = { isAuthenticated: action.isAuth };

  const userState = updated(userUpdate, userAuth);

  return updated(state, userState);
};

/**
 * @function signupSuccess
 * @param {*} state
 * @param {*} action
 * @returns {object} object
 */
const signupSuccess = (state, action) => {
  const userInput = { ...action.data };

  const userUpdate = updated(state.userData, userInput);

  const response = { responseMessage: action.responseMsg };

  const userAuth = { isAuthenticated: action.isAuth };

  const userState = updated(userUpdate, userAuth, response);

  return updated(state, userState);
};

/**
 * @function signupFail
 * @param {*} state
 * @param {*} action
 * @returns {object} object
 */
const signupFail = (state, action) => {
  const userInput = { userData: {} };

  const userUpdate = updated(state.userData, userInput);

  const response = { responseMessage: '' };

  const error = { errorMessage: action.errorMsg };

  const userAuth = { isAuthenticated: action.isAuth };

  const userState = updated(userUpdate, userAuth, response);

  return updated(state, userState, error);
};

/**
 * @function reducer
 * @param {*} state
 * @param {*} action
 * @returns {Object} new state
 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_REQUEST:
      return signupRequest(state, action);

    case actionTypes.SIGNUP_SUCCESS:
      return signupSuccess(state, action);

    case actionTypes.SIGNUP_FAIL:
      return signupFail(state, action);

    default:
      return state;
  }
};

export default reducer;
