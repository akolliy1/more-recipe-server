import Sequelize from 'sequelize';
import { User, Recipe, Review } from '../models';
import { Recipevalidation } from '../middlewares/recipeValidation';
/**
 * @description Create Recipes
 * @param {object} req - request
 * @param {object} res - response
 * @returns {promise} return promise
 */
export default class recipes {
  /**
   * @description Recipe validation
   * @param {*} req request
   * @param {*} res Response
   * @returns {object} object
   */
  static async createRecipes(req, res) {
    const { decoded } = req;
    const userId = decoded.id;
    const {
      name, description, procedure, ingredients, imageUrl, imageId
    } = { ...req.body };
    const errors = Recipevalidation({ name, procedure, ingredients });
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }
    /**
     * @function validation
     * @param {*} userId
     * @param {*} name
     * @return {Promise}npromise
     */
    const RecipeNameAndIdCheck = async () => {
      const { Op } = { ...Sequelize };
      const recipe = await Recipe.findOne({
        where: {
          [Op.and]: [{ userId }, { name }]
        }
      });
      if (recipe) {
        return res.status(401).send({
          success: false,
          message: `sorry ${name} recipe name had already been added by you choose another name`
        });
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
          .then((isRecipe) => {
            if (!isRecipe) {
              reject(res.status(400).send({
                success: false,
                message: 'unable to create recipe'
              }));
            } else {
              resolve(res.status(201).send({
                success: true,
                message: 'Recipe successfuly added!',
                recipe: isRecipe
              }));
            }
          })
          .catch(() => {
            res.status(400).send({
              message: 'error occur recipe name already exist',
              success: false
            });
          });
      });
      return promise;
    };
    RecipeNameAndIdCheck(userId, name);
  }
  /**
   * @description getAllRecipes - get all user recipes
   * @param {*} req request
   * @param {*} res response
   * @returns {object} object
   */
  static async getAllRecipes(req, res) {
    const recipe = await Recipe.findAll({});
    if (recipe.length > 0) {
      return res.status(200).send({
        success: true,
        recipe
      });
    }
    return res.status(404).send({
      success: false,
      message: 'You have not added recipes'
    });
  }
  /**
   * @description getAllRecipes - get all user recipes
   * @param {*} req request
   * @param {*} res response
   * @returns {object} object
   */
  static async getAllUserRecipes(req, res) {
    const { decoded } = req;
    const userId = decoded.id;
    const recipe = await Recipe.findAll({ where: { userId } });
    if (recipes.length > 0) {
      return res.status(200).send({
        success: true,
        recipe
      });
    }
    return res.status(404).send({
      success: false,
      message: 'You have not added recipes'
    });
  }
  /**
   * @description getSingleRecipes - get a single recipe
   * @param {*} req request
   * @param {*} res response
   * @returns {object} object
   */
  static async getSingleRecipe(req, res) {
    const { recipeId } = { ...req.params };
    try {
      const recipe = await Recipe.findOne({
        where: { id: recipeId },
        include: [{
          model: User, attributes: ['name']
        }, { model: Review, attributes: ['content', 'userId', 'name', 'imageUrl'] }]
      });
      if (recipe) {
        const recipeIncre = await recipe.increment('viewCount');
        if (recipeIncre) {
          return res.status(200).send({
            success: true,
            message: 'Recipe found',
            recipe
          });
        }
        // i want recipe comment to have image and name display

        throw new Error('Unable to Increment view');
      }
      throw new Error('can\'t find Recipe');
    } catch (err) {
      const { message } = { ...err };
      return res.status(404).send({
        success: false,
        message
      });
    }
  }
}
