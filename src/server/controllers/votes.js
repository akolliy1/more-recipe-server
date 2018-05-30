import models from '../models'
const {Recipe, Upvote, Downvote} = models

export default class votes {
  /**
     * @description Recipe unlike
     * @param {*} req HTTP - Resquest
     * @param {*} res HTTP - Response
     * @example - check if it's Upvoted and it's recipe then downvote and
     * incremeent recipe downvotes
     * - check if it's neither Upvoted nor Downvoted then downvote and
     * incremeent recipe downvotes
     * - check if it isnt Upvoted but it's Downvoted then return confirmation for it's existence
     * @returns {object} object
     */
  static async unlike (req, res) {
    const { userId, recipeId } = req.params
    const isUpvoted = await Upvote.find({ where: { userId: userId, recipeId: recipeId } })
    const isRecipe = await Recipe.find({where: {id: recipeId}})
    const isDownvoted = await Downvote.find({ where: { userId: userId, recipeId: recipeId } })
    if (!isRecipe) return res.status(404).send({success: false, message: 'recipe not found'})
    if (isUpvoted && isRecipe && !isDownvoted) {
      const unLikeRecipe = await isRecipe.decrement('upvotes')
      const addDownVote = await Downvote.create({userId: userId, recipeId: recipeId})
      if (unLikeRecipe && addDownVote) {
        const increaseDownvoteRecipe = await isRecipe.increment('downvotes')
        if (increaseDownvoteRecipe) return res.status(201).send({success: true, message: 'unliked'})
      }
    } if (!isUpvoted && isRecipe && !isDownvoted) {
      const addDownVote = await Downvote.create({ userId: userId, recipeId: recipeId })
      const increaseDownvoteRecipe = await isRecipe.increment('downvotes')
      if (addDownVote && increaseDownvoteRecipe) return res.status(201).send({success: true, message: 'unliked'})
    } if (isUpvoted && isRecipe && isDownvoted) {
      const deleteDownvote = await isUpvoted.destroy()
      if (deleteDownvote) return res.status(404).send({success: true, message: 'deleted'})
    } else { return res.status(409).send({success: false, message: 'already downvoted'}) }
  }
  /**
     * @description  Recipe like
     * @param {*} req HTTP - Resquest
     * @param {*} res HTTP - Response
     * @returns {Promise} promise
     */
  static async like (req, res) {
    const {recipeId, userId} = req.params
    const isUpvoted = await Upvote.find({where: {userId: userId, recipeId: recipeId}})
    if (isUpvoted) {
      return res.status(409).send({success: false, message: 'already liked'})
    }
    const upvoted = await Upvote.create({recipeId: recipeId, userId: userId})
    if (upvoted) {
      const isRecipe = await Recipe.findOne({ where: { id: recipeId } })
      if (isRecipe) {
        const recipeLiked = await isRecipe.increment('upvotes')
        if (recipeLiked) {
          return res.status(201).send({ success: true, message: 'liked' })
        }
      }
    }
  }
}
