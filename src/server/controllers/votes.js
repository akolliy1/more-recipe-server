import models from '../models'
import Sequelize from 'sequelize'
const {Recipe, Upvote, Downvote} = models

export default class votes {
  /**
     * @description Recipe unlike
     * @param {*} req HTTP - Resquest
     * @param {*} res HTTP - Response
     * @returns {object} object
     * - check if it's `Upvoted` and if it's `Recipe` then `Downvote` and
     * `increment` `recipe downvotes`
     * - check if it's neither `Upvoted` nor `Downvoted` then `downvote` and
     * `increment` `Recipe downvotes`
     * - check if it isnt `Upvoted` but it's `Downvoted` then return confirmation for it's existence
     */
  static async unlike (req, res) {
    const Op = Sequelize.Op
    const { userId, recipeId } = req.params
    const isUpvoted = await Upvote.find({ where: { [Op.and]: [{ userId: userId }, { recipeId: recipeId }] } })
    const isRecipe = await Recipe.find({where: {id: recipeId}})
    const isDownvoted = await Downvote.find({ where: { [Op.and]: [{ userId: userId }, { recipeId: recipeId }] } })
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
    } else {
      const isDownvotedDelete = await isDownvoted.destroy()
      if (isDownvotedDelete) {
        const addDownVote = await Downvote.create({ userId: userId, recipeId: recipeId })
        const increaseDownvoteRecipe = await isRecipe.increment('downvotes')
        if (addDownVote && increaseDownvoteRecipe) return res.status(201).send({ success: true, message: 'unliked' })
      }
      // return res.status(409).send({success: false, message: 'already downvoted'})
    }
  }
  /**
     * @description  Recipe like
     * @param {*} req HTTP - Resquest
     * @param {*} res HTTP - Response
     * @returns object
     */
  static async like (req, res) {
    const Op = Sequelize.Op
    const {recipeId, userId} = req.params
    const isUpvoted = await Upvote.find({ where: { [Op.and]: [{ userId: userId }, { recipeId: recipeId }] } })
    const isRecipe = await Recipe.find({where: {id: recipeId}})
    const isDownvoted = await Downvote.find({where: {[Op.and]: [{userId: userId}, {recipeId: recipeId}]}})
    if (!isRecipe) return res.status(404).send({success: false, message: 'recipe not found'})
    if (isDownvoted && isRecipe && !isUpvoted) {
      const removeUnLikeRecipe = await isRecipe.decrement('downvotes')
      const liked = await Upvote.create({userId: userId, recipeId: recipeId})
      if (liked && removeUnLikeRecipe) {
        const iLikeRecipe = await isRecipe.increment('upvotes')
        if (iLikeRecipe) return res.status(201).send({success: true, message: 'liked'})
      }
    } if (!isDownvoted && isRecipe && !isUpvoted) {
      const liked = await Upvote.create({userId: userId, recipeId: recipeId})
      const iLikeRecipe = await isRecipe.increment('upvotes')
      if (liked && iLikeRecipe) return res.status(201).send({success: true, message: 'liked'})
    } else {
      const isUpvotedDelete = await isUpvoted.destroy()
      if (isUpvotedDelete) return this.like()
      // return res.status(409).send({success: false, message: 'already liked'})
    }
  }
}
// if (isUpvoted && isRecipe && isDownvoted) {
//   const deleteDownvote = await isUpvoted.destroy()
//   if (deleteDownvote) return res.status(404).send({ success: true, message: 'deleted' })
// }
