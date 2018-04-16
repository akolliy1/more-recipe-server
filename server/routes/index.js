import User from '../controllers/users'

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the Users API!',
    }));

    app.post('/api/users/signup', User.signUp);
    app.post('/api/users/signin', User.signIn);
    app.delete('/api/users/:userId', User.destroy);

    // For any other request method on todo items, we're going to return "Method Not Allowed"
    app.all('/api/users/:userId/items/comments', (req, res) =>
        res.status(405).send({
            message: 'Method Not Allowed',
        }));
};
