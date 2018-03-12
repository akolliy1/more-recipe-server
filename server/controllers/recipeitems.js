const RecipeItem = require('../models').RecipeItem;
const RecipeComment = require('../models').RecipeComment;
const RecipeLike = require('../models').RecipeLike;

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
    list(req, res) {
        return RecipeItem
            .findAll({
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
            })
            .then(recipeItems => res.status(200).send(recipeItems))
            .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
        return RecipeItem
            .find({
                where: {
                    id: req.params.recipeItemId,
                    userId: req.params.userId,
                },
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
            })
            .then(recipeItem => {
                if (!recipeItem) {
                    return res.status(404).send({
                        message: 'RecipeItem Not Found',
                    });
                }
                return res.status(200).send(recipeItem);
            })
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return RecipeItem
            .find({
                where: {
                    id: req.params.recipeItemId,
                    userId: req.params.userId,
                },
            })
            .then(recipeItem => {
                if (!recipeItem) {
                    return res.status(404).send({
                        message: 'RecipeItem Not Found',
                    });
                }

                return recipeItem
                    .update({
                        content: req.body.content || recipeItem.content,
                        complete: req.body.complete || recipeItem.complete,
                    })
                    .then(updatedRecipeItem => res.status(200).send(updatedRecipeItem))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    destroy(req, res) {
        return RecipeItem
            .find({
                where: {
                    id: req.params.recipeItemId,
                    userId: req.params.userId,
                },
            })
            .then(recipeItem => {
                if (!recipeItem) {
                    return res.status(404).send({
                        message: 'RecipeItem Not Found',
                    });
                }

                return recipeItem
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
};
