import { Recipes, Favorites, Upvotes, Downvotes } from "../models";

export const recipeItem = (req, res) => {
    const promise = new Promise ((resolve, reject) => {
        const name = req.body.name,
            description = req.body.description,
            procedure = req.body.procedure,
            ingredients = req.body.ingredients,
            imageUrl = req.body.imageUrl,
            imageId = req.body.imageId,
            userId = req.params.userId
        resolve(name,description,procedure,ingredients,imageUrl,imageId,userId)
    })
    return promise
    
}
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
    
export const validRecipe = (name,
    description,
    procedure,
    ingredients,
    imageUrl,
    imageId,
    userId) => {
    req.checkBody({
        name: {
            notEmpty: {
                options: true,
                errorMessage: 'Recipe name cannot be empty'
            },
            isLength: {
                options: [{ min: 3 }],
                errorMessage: 'recipe name length must be 3 letters'
            },
            matches: {
                errorMessage: 'Recipe name must be aphanumeric',
                options: [(/^[a-z][^]+( [a-z]+)*$/g)]
            }
        },
        procedure: {
            notEmpty: {
                options: true,
                errorMessage: 'Recipe cannot be '
            }
        }
    })
}
