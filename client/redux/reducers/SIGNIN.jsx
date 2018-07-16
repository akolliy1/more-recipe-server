import * as actionTypes from '../constants/SignIn';

const initialState = {
  userData: {
    name: '',
    username: '',
    email: '',
    password: ''
  },
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
      return {
        ...state,
        userData: {
          ...state.userData,
          [action.userDataName]: state.userData[action.userDataName] + action.value
        }
      };
    default:
      break;
  }
};

export default reducer;
