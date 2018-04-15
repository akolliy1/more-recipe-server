import model from '../models'

const { RecipeComment, RecipeItem } = model;

class recipeComments {
    static create(req, res) {
        return RecipeComment
            .create({
                content: req.body.content,
                userId: req.params.userId,
                recipeItemId: req.params.recipeItemId,
            })
            .then(recipeComment => res.status(201).send(recipeComment))
            .catch(error => res.status(400).send(error));
    }
    static update(req, res) {
        return RecipeComment
            .find({
                where: {
                    id: req.params.recipeCommentId,
                    userId: req.params.userId,
                    recipeItemId: req.params.recipeItemId,
                },
            })
            .then(recipeComment => {
                if (!recipeComment) {
                    return res.status(404).send({
                        message: 'RecipeComment Not Found',
                    });
                }

                return recipeComment
                    .update({
                        content: req.body.content || recipeComment.content,
                        complete: req.body.complete || recipeComment.complete,
                    })
                    .then(updatedRecipeComment => res.status(200).send(updatedRecipeComment))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    }
    static destroy(req, res) {
        return RecipeComment
            .find({
                where: {
                    id: req.params.recipeCommentId,
                    userId: req.params.userId,
                    recipeItemId: req.params.recipeItemId,
                },
            })
            .then(recipeComment => {
                if (!recipeComment) {
                    return res.status(404).send({
                        message: 'RecipeComment Not Found',
                    });
                }

                return recipeComment
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    }
};
export default recipeComments