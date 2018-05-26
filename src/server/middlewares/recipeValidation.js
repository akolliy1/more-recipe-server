import { Recipes, Favorites, Upvotes, Downvotes } from "../models";

export const Recipevalidation = ({name, procedure, ingredients}) => {
    let errors = [];
    let field,
        message;
    if (!name || name.length < 3 || name.match(/^[ ]/)) {
        message = 'name cannot be less than 3 character and no spacing';
        field = 'name';
        errors.push( message, field );
    }
    if (!ingredients || ingredients.length < 8) {
        message = 'Ingredients must be atleast 8 and alphanumeric';
        field = 'Ingredients';
        errors.push(message,field)
    }
    if (!procedure || procedure.length < 8) {
        message = 'Procedure cannot be less than 8 character';
        field = 'Procedure';
        errors.push( message, field)
    }
    return errors
}
