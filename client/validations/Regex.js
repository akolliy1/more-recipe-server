/**
 * @description regex stored
 */

const validName = /^[A-Za-z][^ ]+( [a-z]+)*$/gi;

/**
 * @description seperate test for name only
 */
const nameTest = /\d/gi;

/**
 * @description regex stored
 */
const validUsername = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:[a-z])/ig;

/**
 * @description regex stored
 */
const validMail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;


/**
 * @description regex stored
 */
const validPassword = /[a-z][0-9]/gi;

module.exports = {
  validName,
  nameTest,
  validMail,
  validUsername,
  validPassword
};
