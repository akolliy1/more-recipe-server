import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAIL } from '../constants/signupConstants'

const initialState = {
  isAuthenticated: false,
  userInfo: [],
  errorMessage: '',
  successMessage: ''
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        userInfo: [...state.userInfo, ...state.payload],
        isAuthenticated: action.isAuthenticated,
        errorMessage: '',
        successMessage: ''
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        userInfo: [...state.userInfo, ...state.payload],
        isAuthenticated: action.isAuthenticated,
        errorMessage: '',
        successMessage: action.successMessage
      }
    case SIGNUP_FAIL:
      return {
        ...state,
        userInfo: [],
        isAuthenticated: action.isAuthenticated,
        errorMessage: action.errorMessage,
        successMessage: ''
      }
    default:
      return state
  }
}

export default authReducer
