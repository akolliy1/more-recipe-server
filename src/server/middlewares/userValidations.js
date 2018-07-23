import dotenv from 'dotenv';
import model from '../models';
import trimUserData from '../utility/trimUserData';
// import Sequelize from 'sequelize'
dotenv.config();


const { User } = model;
/**
 * @class Validations
 */
class Validations {
  /**
 * @description Validate User data
 * @param {*} req -  request
 * @param {*} res - respond
 * @param {*} next - next
 * @returns { object } json object
 */
  static async validateUserSignin(req, res, next) {
    const { username, password } = req.body;
    if (!username || username.length < 3) {
      return res.status(400).send({
        success: false,
        message: 'Username field cannot be empty'
      });
    }
    if (!password || password.length < 3) {
      return res.status(400).send({
        success: false,
        message: 'Password field cannot be empty'
      });
    }
    next();
  }
  /**
   * @description validate user input if already existed
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {object} validated response
   */
  static async ValidateUserUpdate(req, res, next) {
    const userId = req.decoded.id;
    const { name } = req.body;
    const email = trimUserData(req.body.email);
    const user = await User.findById(userId);
    const check = await function checker() {
      if (name === user.name && email === user.email) {
        return res.status(200).send({
          message: 'already up-to-date'
        });
      }
      next();
    };
    check();
  }
}
export default Validations;
