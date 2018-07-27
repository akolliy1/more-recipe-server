import updated from '../helper';
import * as actionTypes from '../constants/Recipe';

const initialState = {
  isAuthenticated: false,
  loading: true,
  recipes: [],
  responseMsg: ''
};

/**
 * @function recipeRequest
 * @param {*} state
 * @param {*} action
 * @returns {object} object
 */
const recipeRequest = (state, action) => {
  const userAuth = { isAuthenticated: action.isAuth };

  const loader = { loading: action.loading };

  return updated(state, userAuth, loader);
};

/**
 * @function recipeRequest
 * @param {*} state
 * @param {*} action
 * @returns {object} object
 */
const recipeSuccess = (state, action) => {
  const fetchFromServer = { recipes: action.recipeData };

  const recipeUpdate = updated(state.recipes, fetchFromServer);

  const loader = { loading: action.loading };

  const userAuth = { isAuthenticated: action.isAuth };

  const recipeState = updated(recipeUpdate, loader, userAuth);

  return updated(state, recipeState);
};

/**
 * @function recipeFail
 * @param {*} state
 * @param {*} action
 * @returns {object} object
 */
const recipeFail = (state, action) => {
  const userAuth = { isAuthenticated: action.isAuth };

  const loader = { loading: action.loading };

  const response = { responseMsg: action.error };

  const userState = updated(userAuth, loader, response);

  return updated(state, userState);
};

/**
 * @function reducer
 * @param {*} state
 * @param {*} action
 * @returns {Object} new state
 */
const recipes = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESQUEST_ALL_RECIPES:
      return recipeRequest(state, action);

    case actionTypes.SET_ALL_RECIPES:
      return recipeSuccess(state, action);

    case actionTypes.REQUEST_RECIPES_FAIL:
      return recipeFail(state, action);

    default:
      return state;
  }
};

export default recipes;
