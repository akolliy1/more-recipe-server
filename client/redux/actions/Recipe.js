import axios from 'axios';
import jwt from 'jsonwebtoken';
import * as actionType from '../constants/Recipe';
import { setCurrentUser } from './index';

const url = '/recipes/';
/**
 * @function recipeRequest
 *
 * @param {*} isAuthenticated
 *
 * @returns {action} dispatch
 */
export const requestAllRecipes = () => ({
  type: actionType.RESQUEST_ALL_RECIPES,
  isAuth: false,
  recipe: []
});

/**
 * @function recipeSuccess
 *
 * @param {*} recipeData
 *
 * @returns {action} dispatch
 */
export const setAllRecipes = recipeData => ({
  type: actionType.SET_ALL_RECIPES,
  isAuth: true,
  loading: false,
  recipe: recipeData
});

/**
 * @function recipeFail
 *
 * @param {*} errors
 *
 * @returns {action} dispatch
 */
export const requestRecipeFail = errors => ({
  type: actionType.REQUEST_RECIPES_FAIL,
  recipeData: [],
  error: errors
});

/**
 * @function actionCreator
 *
 * @param {*} recipe
 *
 * @returns {action} dispatch
 */
export const onRecipeAction = () => (dispatch) => {
  const token = localStorage.getItem('userToken');
  const userInfo = jwt.decode(token);
  const response = 'welcome';
  dispatch(setCurrentUser(userInfo, response));
  axios.defaults.headers['x-access-toke'] = token;
  axios.get(`${url}`)
    .then((res) => {
      const { recipe } = res.data;
      const allRecipes = recipe;
      dispatch(setAllRecipes(allRecipes));
    })
    .catch((err) => {
      const { message } = err.response.data;
      dispatch(requestRecipeFail(message));
    });
};
