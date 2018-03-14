const RecipeLike = require('../models').RecipeLike;
const RecipeItem = require('../models').RecipeItem

module.exports = {
    create(req, res) {
        return RecipeLike
            .create({
                content: req.body.content,
                userId: req.params.userId,
                recipeItemId: req.params.recipeItemId,
            })
            .then(recipeLike => res.status(201).send(recipeLike))
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return RecipeLike
            .find({
                where: {
                    id: req.params.recipeLikeId,
                    userId: req.params.userId,
                    recipeItemId: req.params.recipeItemId,
                },
            })
            .then(recipeLike => {
                if (!recipeLike) {
                    return res.status(404).send({
                        message: 'RecipeLike Not Found',
                    });
                }

                return recipeLike
                    .update({
                        content: req.body.content || recipeLike.content,
                        complete: req.body.complete || recipeLike.complete,
                    })
                    .then(updatedRecipeLike => res.status(200).send(updatedRecipeLike))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    destroy(req, res) {
        return RecipeLike
            .find({
                where: {
                    id: req.params.recipeLikeId,
                    userId: req.params.userId,
                    recipeItemId: req.params.recipeItemId,
                },
            })
            .then(recipeLike => {
                if (!recipeLike) {
                    return res.status(404).send({
                        message: 'RecipeLike Not Found',
                    });
                }

                return recipeLike
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
};