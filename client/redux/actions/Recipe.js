import jwt from 'jsonwebtoken';
// import axios from 'axios';
import verifyUser from '../Helper/verifyUser';
import fetchRecipe from '../Helper/fetchRecipe';
import * as actionType from '../constants/Recipe';

/**
 * @function recipeRequest
 *
 * @param {*} isAuthenticated
 *
 * @returns {action} dispatch
 */
export const recipeRequest = isAuthenticated => ({
  type: actionType.default.RECIPE_REQUEST,
  isAuth: isAuthenticated,
  recipe: []
});

/**
 * @function recipeSuccess
 *
 * @param {*} isAuthenticated
 *
 * @param {*} recipeData
 *
 * @returns {action} dispatch
 */
export const recipeSuccess = (isAuthenticated, recipeData) => ({
  type: actionType.default.RECIPE_SUCCESS,
  isAuth: isAuthenticated,
  recipe: recipeData
});

/**
 * @function recipeFail
 *
 * @param {*} errors
 *
 * @returns {action} dispatch
 */
export const recipeFail = errors => ({
  type: actionType.default.RECIPE_FAIL,
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
  if (token) {
    const tokenDetails = jwt.decode(token);
    const { id } = tokenDetails;
    const verified = verifyUser(id, token);
    if (verified) {
      dispatch(recipeRequest(true));

      return fetchRecipe(id, token, (res) => {
        const recipeDetails = res.data;
        dispatch(recipeSuccess(true, recipeDetails));
      }, (err) => {
        const error = err.response.data;
        dispatch(recipeFail(error));
      });
    }
    dispatch(recipeRequest(false));
  }
};
