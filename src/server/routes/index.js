import User from '../controllers/users';
import favorites from '../controllers/favorites';
import recipes from '../controllers/recipes';
import reviews from '../controllers/reviews';
import votes from '../controllers/votes';
import Validations from '../middlewares/userValidations';
// import auth from '../middlewares/auth';

// const newAuth = new auth();
/**
 * @description Invoking Object Data as new object
 * @method  { any } method = new method
 */

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Users API!'
  }));
  // app.use('*', newAuth.verify);
  app.post('/api/v1/users/signup', User.signUp);
  app.post('/api/users/signin', Validations.validateUserSignin, User.signIn);
  app.get('/api/user/:userId/profile', User.listAUser);
  app.put('/api/user/:userId/update', Validations.ValidateUserUpdate, User.updateUser);
  // route to create recipes
  app.route('/recipes')
    .post(recipes.createRecipes)
    .get(recipes.getAllRecipes);
  app.get('/recipes/:recipeId', recipes.getSingleRecipe);
  app.delete('/api/users/:userId', User.destroy);

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
