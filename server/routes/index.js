import User from '../controllers/users'

import recipeItemsController from '../controllers/recipeitems';
import recipeCommentsController from '../controllers/recipecomments';
import recipeLikesController from '../controllers/recipelikes';

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the Users API!',
    }));

    app.post('/api/users/signup', User.create);
    app.post('/api/users/signin', User.signin);
    app.delete('/api/users/:userId', User.destroy);

    app.post('/api/users/:userId/items', recipeItemsController.create);
    app.get('/api/users/:userId/items', recipeItemsController.list);
    app.get('/api/users/:userId/items/:recipeItemId', recipeItemsController.retrieve);
    app.put('/api/users/:userId/items/:recipeItemId', recipeItemsController.update);
    app.delete('/api/users/:userId/items/:recipeItemId', recipeItemsController.destroy);

    app.post('/api/users/:userId/items/:recipeItemId/comments', recipeCommentsController.create);
    app.put('/api/users/:userId/items/:recipeItemId/comments/:recipeCommentId', recipeCommentsController.update);
    app.delete('/api/users/:userId/items/:recipeItemId/comments/:recipeCommentId', recipeCommentsController.destroy);

    app.post('/api/users/:userId/items/:recipeItemId/like', recipeLikesController.create);
    app.put('/api/users/:userId/items/:recipeItemId/like/:recipeLikeId', recipeLikesController.update);
    app.delete('/api/users/:userId/items/:recipeItemId/like/:recipeLikeId', recipeLikesController.destroy)

    // For any other request method on todo items, we're going to return "Method Not Allowed"
    app.all('/api/users/:userId/items/comments', (req, res) =>
        res.status(405).send({
            message: 'Method Not Allowed',
        }));
};
