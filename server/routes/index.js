import User from '../controllers/users';
import recipes from "../controllers/recipes";

/**
 * @description Invoking Object Data as new object
 * @method  { any } method = new method
 */

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the Users API!',
    }));

    app.post('/api/v1/users/signup', User.signUp );
    app.post('/api/users/signin', User.signIn);
    app.get('/api/users/:userId/profile', User.listAUser);
    // route to create recipes
    app.post('/recipes', recipes.createRecipes)
    app.delete('/api/users/:userId', User.destroy);

    // For any other request method on todo items, we're going to return "Method Not Allowed"
    app.all('/api/users/:userId/items/comments', (req, res) =>
        res.status(405).send({
            message: 'Method Not Allowed',
        }));
};
