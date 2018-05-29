import models from '../models'
const {Recipe, Upvote, Downvote} = models

export default class votes {
  /**
     * @description like - Recipe like
     * @param {*} req
     * @param {*} res
     * @returns {Promise} promise
     */
  static unlike (req, res) {
    const { userId, recipeId } = req.body
    const promise = new Promise((resolve, reject) => {

    })
    return promise
    // const downvote =
  }
  /**
     * @description like - Recipe like
     * @param {*} req
     * @param {*} res
     * @returns {Promise} promise
     */
  static like (req, res) {
    const promise = new Promise((resolve, reject) => {
      const { userId, recipeId } = req.body
      const upvoted = async function () {
        await Upvote.findOrCreate({userId, recipeId})
          .spread((isLiked, liked) => {
            if (liked) {
              Recipe.findById(recipeId).then((recipe) => {
                recipe.increment('upvotes')
                resolve(res.status(201).send({success: true, message: 'Recipe liked'}))
              })
            }
            reject(res.status(409).send({success: false, message: 'you\'ve liked'}))
          })
      }
      upvoted()
    })
    return promise
  }
}
