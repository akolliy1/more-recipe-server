import { combineReducers } from 'redux';
import Recipe from './Recipe';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  authReducer,
  recipe: Recipe
});

export default rootReducer;
