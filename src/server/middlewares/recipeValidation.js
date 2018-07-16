/**
 * @function Recipe-validation
 * @param {Object} Object
 * @returns {Array} Errors
 */
export const Recipevalidation = ({ name, procedure, ingredients }) => {
  const errors = [];
  let field,
    message;
  if (!name || name.length < 3 || name.match(/^[ ]/)) {
    message = 'name cannot be less than 3 character and no spacing';
    field = 'name';
    errors.push(message, field);
  }
  if (!ingredients || ingredients.length < 8) {
    message = 'Ingredients must be atleast 8 and alphanumeric';
    field = 'Ingredients';
    errors.push(message, field);
  }
  if (!procedure || procedure.length < 8) {
    message = 'Procedure cannot be less than 8 character';
    field = 'Procedure';
    errors.push(message, field);
  }
  return errors;
};

/**
 * @function Review-validation
 * @param {Object} Object
 * @returns {Element} Error
 */
export const reviewValidation = ({ content }) => {
  let errors;
  if (!content || content.length < 2) {
    errors = 'make sure recipe is not empty and less than 2';
  }
  return errors;
};
