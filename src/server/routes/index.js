import User from '../controllers/users'
import favorites from "../controllers/favorites";
import recipes from '../controllers/recipes'
import reviews from '../controllers/reviews'
import Validations from '../middlewares/userValidations'
/**
 * @description Invoking Object Data as new object
 * @method  { any } method = new method
 */

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Users API!'
  }))

  app.post('/api/v1/users/signup', User.signUp)
  app.post('/api/users/signin', Validations.validateUserSignin, User.signIn)
  app.get('/api/users/:userId/profile', User.listAUser)
  // route to create recipes
  app.route('/recipes')
    .post(recipes.createRecipes)
    .get(recipes.getAllRecipes)
  app.get('/recipes/:recipeId', recipes.getSingleRecipe)
  app.delete('/api/users/:userId', User.destroy)

  // review route
  app.post('/:recipeId/review', reviews.addReview)

  // favorites
  app.route('/:recipeId/favorite')
    .post(favorites.newFavorite)
  app.delete('/:favoriteId', favorites.unfavorite)
  app.get('/favorite', favorites.myFavorite)
}
