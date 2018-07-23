import axios from 'axios';

/**
 * @function fetchRecipe
 *
 * @description  http-Request
 *
 * @param {*} id userId
 *
 * @param {*} token token
 *
 * @param {*} func callback
 *
 * @param {*} err callback
 *
 * @returns {void} request
 */
const fetchRecipe = (id, token, func, err) => axios.get(`/api/users/${id}`, {
  headers: {
    Authorization: `${token}`
  }
}).then(func).catch(err);

export default fetchRecipe;
