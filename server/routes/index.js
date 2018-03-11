const usersController = require('../controllers').users;
const recipeItemsController = require('../controllers').recipeItems;

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the Users API!',
    }));

    app.post('/api/users', usersController.create);
    app.get('/api/users', usersController.list);
    app.get('/api/users/:userId', usersController.retrieve);
    app.post('/api/users/:userId/items', recipeItemsController.create);
};