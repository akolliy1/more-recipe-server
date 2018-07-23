import { combineReducers } from 'redux';
import Signup from './Signup';
import Signin from './Signin';
import Recipe from './Recipe';

const rootReducer = combineReducers({
  signin: Signin,
  signup: Signup,
  recipe: Recipe
});

export default rootReducer;
