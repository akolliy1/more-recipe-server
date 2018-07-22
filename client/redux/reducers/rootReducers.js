import { combineReducers } from 'redux';
import Signup from './Signup';
import Signin from './Signin';

const rootReducer = combineReducers({
  signin: Signin,
  signup: Signup
});

export default rootReducer;
