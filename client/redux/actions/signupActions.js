import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAIL } from '../constants/signupConstants'

export const signupRequest = userInfo => ({
  type: SIGNUP_REQUEST,
  isAuthenticated: false,
  payload: userInfo
})

export const signupSuccess = userInfo => ({
  type: SIGNUP_SUCCESS,
  isAuthenticated: true,
  payload: userInfo
})

export const signupFail = userInfo => ({
  type: SIGNUP_FAIL,
  isAuthenticated: false,
  payload: userInfo
})
