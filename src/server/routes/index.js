import User from '../controllers/users';
import favorites from '../controllers/favorites';
import recipes from '../controllers/recipes';
import reviews from '../controllers/reviews';
import votes from '../controllers/votes';
import Validations from '../middlewares/userValidations';
import authetication from '../middlewares/auth';
/**
 * @description Invoking Object Data as new object
 * @method  { any } method = new method
 */

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Users API!'
  }));
  app.post('/api/v1/users/signup', User.signUp);
  app.post('/api/v1/users/signin', Validations.validateUserSignin, User.signIn);
  app.get('/api/user/:userId/profile', authetication.verify, User.listAUser);
  app.put(
    '/api/user/:userId/update', authetication.verify,
    Validations.ValidateUserUpdate, User.updateUser
  );

  // route to create recipes and destroy user account
  app.route('/recipes')
    .post(authetication.verify, recipes.createRecipes)
    .get(recipes.getAllRecipes);
  app.get('/recipes/:recipeId', authetication.verify, recipes.getSingleRecipe);
  app.route('/api/users/:userId')
    .get(authetication.verify, recipes.getAllUserRecipes)
    .delete(authetication.verify, User.destroy);

  // review route
  app.post('/:recipeId/review', reviews.addReview);

  // votes route
  app.post('/:userId/:recipeId/votes', votes.like);
  app.post('/:userId/:recipeId/unlike', votes.unlike);

  // favorites
  app.route('/:userId/:recipeId/favorite')
    .post(favorites.newFavorite)
    .delete(favorites.unfavorite);
  app.get('/:userId/favorite', favorites.myFavorite);
};
