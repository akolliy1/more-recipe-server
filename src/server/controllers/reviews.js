import { User, Review } from '../models'
import { reviewValidation } from '../middlewares/recipeValidation'

export default class reviews {
  /**
     * @description create recipe review i.e comment
     * @param {object} req
     * @param {object} res
     * @returns {object}
     */
  static async addReview (req, res) {
    const content = req.body.content
    // user Id suppose to be req.decoded.id when front end is connected
    const userId = req.body.userId
    const recipeId = req.params.recipeId
    try {
      const reviewErr = await reviewValidation({userId, recipeId, content})
      let message
      if (reviewErr) {
        message = reviewErr
        throw new Error(message)
      }
      const userDetails = await User.findOne({
        attributes: ['name', 'imageUrl'],
        where: {id: userId}
      })
      if (userDetails) {
        const {name, imageUrl} = userDetails
        const created = await Review.create({ content, userId, name, imageUrl, recipeId })
        if (created) {
          return res.status(201).send({
            success: true,
            message: 'reviewed',
            created
          })
        }
        throw new Error('Unable too Review')
      }
      throw new Error('Cannot find user Details make sure is correct user id')
    } catch (err) {
      const message = err.message
      return res.status(400).send({success: false, message})
    }
  }
}
