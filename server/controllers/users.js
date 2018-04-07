const bcrypt = require('bcrypt');
const User = require('../models').User;
const RecipeItem = require('../models').RecipeItem;
const RecipeComment = require('../models').RecipeComment;
const RecipeLike = require('../models').RecipeLike;

module.exports = {
    create(req, res) {
        const { name, username, email } = req.body
        let { password } = req.body;
        password = bcrypt.hashSync(password, bcrypt.genSaltSync());
        return User
            .create({
                name,
                username,
                email,
                password
            })
            .then(user => res.status(201).send(user))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return User
            .findAll({
                include: [{
                    model: RecipeItem,
                    as: 'recipeItems',
                    include: [
                        {
                            model: RecipeComment,
                            as: 'recipeComments',
                        },
                        {
                            model: RecipeLike,
                            as: 'recipeLikes',
                        },
                    ],
                }],
            })
            .then(users => res.status(200).send(users))
            .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
        return User
            .findById(req.params.userId, {
                include: [{
                    model: RecipeItem,
                    as: 'recipeItems',
                    include: [
                        {
                            model: RecipeComment,
                            as: 'recipeComments',
                        },
                        {
                            model: RecipeLike,
                            as: 'recipeLikes',
                        },
                    ],
                }],
            })
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                return res.status(200).send(user);
            })
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return User
            .findById(req.params.userId, {
                include: [{
                    model: RecipeItem,
                    as: 'recipeItems',
                    include: [
                        {
                            model: RecipeComment,
                            as: 'recipeComments',
                        },
                        {
                            model: RecipeLike,
                            as: 'recipeLikes',
                        },
                    ],
                }],
            })
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                return user
                    .update({
                        name: req.body.name || user.name,
                        username: req.body.username || user.username,
                        email: req.body.email || user.email,
                        password: req.body.password || user.password,
                    })
                    .then(() => res.status(200).send(user))  // Send back the updated todo.
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
    destroy(req, res) {
        return User
            .findById(req.params.userId)
            .then(user => {
                if (!user) {
                    return res.status(400).send({
                        message: 'User Not Found',
                    });
                }
                return user
                    .destroy()
                    .then(() => res.status(200).send({
                        message: "We are sorry to let you go"
                    }))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },

};
