const RecipeItem = require('../models').RecipeItem;

module.exports = {
    create(req, res) {
        return RecipeItem
            .create({
                content: req.body.content,
                userId: req.params.userId,
            })
            .then(recipeItem => res.status(201).send(recipeItem))
            .catch(error => res.status(400).send(error));
    },
};