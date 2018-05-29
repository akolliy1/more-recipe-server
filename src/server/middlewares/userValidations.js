import trimUserData from '../utility/trimUserData'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import model from '../models'
import Sequelize from 'sequelize'
dotenv.config()
/**
 * @description Validate User data
 * @param req -  request
 * @param res - respond
 * @param next - next
 * @returns { object } json object
 */
const { User } = model
class Validations {
  static async validateUserSignin (req, res, next) {
    const { authName, password } = req.body
    if (!authName || authName.length < 3) {
      return res.status(400).send({
        success: false,
        message: 'Username field cannot be empty'
      })
    }
    if (!password || password.length < 3) {
      return res.status(400).send({
        success: false,
        message: 'Password field cannot be empty'
      })
    }
    next()
  }
  /**
   * @description validate user input if already existed
   * @param {*} req
   * @param {*} res
   * @returns {object} validated response
   */
  static async ValidateUserUpdate (req, res, next) {
    const userId = req.params.userId
    const name = req.body.name
    const email = trimUserData(req.body.email)
    const user = await User.findById(userId)
    const check = await function () {
      if (name === user.name && email === user.email) {
        return res.status(200).send({message: 'already up-to-date'})
      } else { next() }
    }
    check()
  }
}
export default Validations
