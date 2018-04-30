import { User, Recipe, Favorite, Upvote, Downvote } from "../models";
import { Recipevalidation } from "../middlewares/recipeValidation";
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
        const errors = Recipevalidation({name,procedure,ingredients});
        if(errors.length > 0) {
            return res.status(400).send(errors)
        }
        const RecipeNameAndIdCheck = async function(userId, name){
            const Op = Sequelize.Op;
            const recipe = await Recipe.findOne({
                where: {
                    [Op.and]: [{ userId }, { name }]
                }
            })
            if (recipe) {
                return res.status(401).send({
                    success: false,
                    message: `sorry ${name} recipe name already exist`
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
                    .catch(() => {
                        res.status(400).send({
                            message: 'error occur userId not identified',
                            success: false
                        })
                    })
            })
            return promise
        };
        RecipeNameAndIdCheck(userId, name)
        
    };

    static async getAllRecipes(req, res) {
        const recipes = await Recipe.findAll({});
        if(recipes) {
            return res.status(200).send({
                success: true,
                recipes
            })
        }   
        return res.status(200).send({
            success: true,
            message: 'You have not add recipes'
        })
    };

    static async getSingleRecipe(req, res) {
        const recipeId = req.params.recipeId;
        try {
            const recipe = await Recipe.findOne({
                where: {id: recipeId},
                include: [{
                    model: User, attributes: ['name']
                }]
            });
            if(recipe) {
                const recipeIncre = await recipe.increment('viewCount');
                if(recipeIncre) {
                    return res.status(200).send({
                        success: true,
                        message: 'Recipe found',
                        recipe
                    })
                }
                throw new Error('Unable to Increment view')
            }
            throw new Error('can\'t find Recipe')
            
        }
        catch(err) {
            let message = err.message;
            return res.status(404).send({
                success: false,
                message
            })
        }
    }

}