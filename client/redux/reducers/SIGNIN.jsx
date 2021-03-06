import * as actionTypes from '../constants/SignIn';
import updated from '../helper';

const initialState = {
  userData: {
    username: '',
    password: ''
  },
  isAuthenticated: false,
  responseMessage: '',
  errorMessage: '',
  loading: false
};

/**
 * @function signinRequest
 * @param {*} state
 * @param {*} action
 * @returns {object} object
 */
const signinRequest = (state, action) => {
  const userInput = { ...action.data };

  const userUpdate = updated(state.userData, userInput);

  const userAuth = { isAuthenticated: action.isAuth };

  const loader = { loading: action.loading };

  const userState = updated(userUpdate, userAuth, loader);

  return updated(state, userState);
};

/**
 * @function signinSuccess
 * @param {*} state
 * @param {*} action
 * @returns {object} object
 */
const signinSuccess = (state, action) => {
  const userInput = { ...action.data };

  const userUpdate = updated(state.userData, userInput);

  const response = { responseMessage: action.responseMsg };

  const userAuth = { isAuthenticated: action.isAuth };

  const loader = { loading: action.loading };

  const userState = updated(userUpdate, response, userAuth);

  const reSetState = updated(loader, userState);

  return updated(state, reSetState);
};

/**
 * @function signinFail
 * @param {*} state
 * @param {*} action
 * @returns {object} object
 */
const signinFail = (state, action) => {
  const userInput = { userData: {} };

  const userUpdate = updated(state.userData, userInput);

  const userAuth = { isAuthenticated: action.isAuth };

  const response = { responseMessage: '' };

  const error = { errorMessage: action.errorMsg };

  const loader = { loading: action.loading };

  const userState = updated(userUpdate, userAuth, response);

  const reSetState = updated(error, loader, userState);

  return updated(state, reSetState);
};

/**
 * @function reducer
 * @param {*} state
 * @param {*} action
 * @returns {Object} new state
 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNIN_REQUEST:
      return signinRequest(state, action);

    case actionTypes.SIGNIN_SUCCESS:
      return signinSuccess(state, action);

    case actionTypes.SIGNIN_FAIL:
      return signinFail(state, action);

    default:
      return state;
  }
};

export default reducer;
