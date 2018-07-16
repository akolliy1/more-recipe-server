import * as Regex from './Regex';

/**
 * @method validSignin
 * @param {Array} validate
 * @returns {js} validation
 */
const validSignin = (validate) => {
  const [id, eventHandler] = [...validate];
  let regex, test = /\s/gi;
  if (id === 'name') { regex = Regex.validName; test = Regex.nameTest; }
  if (id === 'username') { regex = Regex.validUsername; }
  if (id === 'email') { regex = Regex.validMail; }
  if (id === 'password') { regex = /[a-z][0-9]/gi; }

  const whiteSpace = (test).test(eventHandler[id][id]);

  /* this check for whitespace so as to return correct messages after
   it has been change below */

  if (whiteSpace) {
    eventHandler[id]
      .validation.InvalidMsg = eventHandler[id].validation.validMsg;
  } else {
    eventHandler[id]
      .validation.InvalidMsg = eventHandler[id].validation.fallbackMsg;
  }

  /* this check if user has touched the input field and lenght comfirmation
  so as to display error, if lenght is below the expect
  min. lenght hten error is display */

  if (eventHandler[id].touched
        && eventHandler[id][id].length
        < eventHandler[id].elementConfig.minLength) {
    eventHandler[id].validation.isValid = false;
    eventHandler[id].isSuccess = false;
  }

  /* this check if the user type in the input field and lenght comfirmation
  if user does and lenght truely comfirmed  */

  if (eventHandler[id].touched
        && eventHandler[id][id].length
        >= eventHandler[id].elementConfig.minLength) {
    eventHandler[id].validation.isValid = true;
    eventHandler[id].isSuccess = true;
    const boleanValue = eventHandler[id][id].match(regex);

    if (boleanValue && !whiteSpace) {
      eventHandler[id].validation.isValid = true;
      eventHandler[id].match = true;
      eventHandler[id].isSuccess = true;
    } else {
      eventHandler[id].validation.isValid = false;
      eventHandler[id].isSuccess = false;
    }
  }
};

export default validSignin;
