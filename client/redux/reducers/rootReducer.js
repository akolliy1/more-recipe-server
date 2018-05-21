import authReducers from './authReducers'
import index from './index'
import { combineReducers } from 'redux'
const rootReducer = combineReducers({authReducers, index})
