import { Recipe, Favorite, Upvote, Downvote } from "../models";
import { validRecipe } from "../middlewares/recipeValidation";
/**
 * @description Create Recipes
 * @param {object} req - request
 * @param {object} res - response
 * @returns {promise} return promise
 */
export default class recipes {
    static createRecipes(req, res) {
        const name = req.body.name,
            description = req.body.description,
            procedure = req.body.procedure,
            ingredients = req.body.ingredients,
            imageUrl = req.body.imageUrl,
            imageId = req.body.imageId,
            count = req.body.count,
            viewCount = req.body.viewCount,
            upvotes = req.body.upvotes,
            downvotes = req.body.downvotes,
            userId = req.params.userId;
        const promise = new Promise((resolve, reject) => {
            Recipe
            .create({name,description,procedure,ingredients,imageUrl,imageId,count,viewCount,upvotes,downvotes,userId})
            .then((recipe) => {
                if(!recipe) {
                    reject(
                        res.status(400).send({
                            success: false,
                            message: 'unable to create recipe'
                        })
                    )
                } else {
                    resolve(
                        res.status(201).send({
                            success: true,
                            message: 'Recipe successfuly created!'
                        })
                    )
                }
            })
        })
        return promise
    }
}