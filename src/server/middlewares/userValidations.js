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
}
export default Validations
