import jwt from 'jsonwebtoken';
/**
 * @function checkTokenExpirationMiddleware
 * @param {*} store
 * @param {*} next
 * @param {*} acion
 * @returns {data} dispatch
 */
const checkTokenExpirationMiddleware = store => next => (action) => {
  const { token } = JSON.parse(localStorage.getItem('userToken'));
  if (jwt.decode(token).exp < Math.floor(Date.now() / 1000) + (60 * 60 * 24)) {
    next(action);
    localStorage.clear();
    console.log('checkTokenExpirationMiddleware[Middleware] next state', store.getState());
  }
  next(action);
};

export default checkTokenExpirationMiddleware;
