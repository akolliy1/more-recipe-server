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
            len: {
                options: [{ min: 3 }],
                errorMessage: 'recipe name length must be 3 letters'
            },
            matches: {
                options: [(/^[a-z][^][a-z]/)]
            }
        }
    })
}
