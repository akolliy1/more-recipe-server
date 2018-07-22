/**
 * @function helper
 * @param {*} state
 * @param {*} action
 * @param {*} lastAction
 * @returns {object} object
 */
const helper = (state, action, lastAction) => ({
  ...state,
  ...action,
  ...lastAction
});

export default helper;
