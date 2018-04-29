import { Recipe, Favorite, Upvote, Downvote } from "../models";
import { validRecipe } from "../middlewares/recipeValidation";
import Sequelize from 'sequelize';
/**
 * @description Create Recipes
 * @param {object} req - request
 * @param {object} res - response
 * @returns {promise} return promise
 */
export default class recipes {
    static async createRecipes(req, res) {
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
            userId = req.body.userId;

 /**
 * @description Recipe validation
 * @param {object} userId
 * @param {object} name -Recipe name
 * @returns {async}
 */
        const RecipeNameAndIdCheck = async function(userId, name){
            const Op = Sequelize.Op;
            const recipe = await Recipe.findOne({
                where: {
                    [Op.or]: [{ userId }, { name }]
                }
            })
            if (recipe) {
                return res.status(401).send({
                    success: false,
                    message: `sorry recipe: ${name} name already exist`
                })
            }
            const promise = new Promise((resolve, reject) => {
                Recipe
                    .create({
                        name,
                        description,
                        procedure,
                        ingredients,
                        imageUrl,
                        imageId,
                        userId
                    })
                    .then((recipe) => {
                        if (!recipe) {
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
                                    message: 'Recipe successfuly added!',
                                    recipe
                                })
                            )
                        }
                    })
            })
            return promise
        };
        RecipeNameAndIdCheck(userId, name)
        
    };

    static async getAllRecipe(req, res) {
        return Recipe
    }
}