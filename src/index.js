import _ from 'lodash';
// import './style.css'

/**
 * @description javascript component
 * @function component
 * @returns {javascript} htmlElement
 */
function component() {
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  // Lodash, now imported by this script
  element.innerHTML = 'Hello webpack coming from second entry';
  element.classList.add('hello');

  return element;
}
document.body.appendChild(component());
