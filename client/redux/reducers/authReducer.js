import * as actionTypes from '../constants/authConst';
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
 * @function requestCurrentUser
 * @param {*} state
 * @param {*} action
 * @returns {object} object
 */
const requestCurrentUser = (state, action) => {
  const userInput = { ...action.data };

  const userUpdate = updated(state.userData, userInput);

  const userAuth = { isAuthenticated: action.isAuth };

  const loader = { loading: action.loading };

  const userState = updated(userUpdate, userAuth, loader);

  return updated(state, userState);
};

/**
 * @function setCurrentUser
 * @param {*} state
 * @param {*} action
 * @returns {object} object
 */
const setCurrentUser = (state, action) => {
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
 * @function removeCurrentUser
 * @param {*} state
 * @param {*} action
 * @returns {object} object
 */
const removeCurrentUser = (state, action) => {
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
    case actionTypes.REQUEST_CURRENT_USER:
      return requestCurrentUser(state, action);

    case actionTypes.SET_CURRENT_USER:
      return setCurrentUser(state, action);

    case actionTypes.REMOVE_CURRENT_USER:
      return removeCurrentUser(state, action);

    case actionTypes.SIGNOUT_USER:
      return removeCurrentUser(state, action);

    default:
      return state;
  }
};

export default reducer;
