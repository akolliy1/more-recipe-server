/* jshint esnext: true */
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Sequelize from 'sequelize'
import trimUserData from '../utility/trimUserData'
import { inputValidation } from '../middlewares/inputValidation'
import { User, Recipe, Review, Favorite } from '../models'
const secret = process.env.JWT_SECRET

/**
 * @description Validate username and Email
 * @param {object} Username
 * @param {object} Email
 * @returns {Promise} if validated
 */
const userNameAndEmailValidation = (username, email) => {
  const promise = new Promise((resolve, reject) => {
    const Op = Sequelize.Op
    User
      .findOne({
        attributes: ['email', 'username'],
        where: {
          [Op.or]: [{ username: username }, { email: email }]
        }
      })
      .then((user) => {
        if (user) {
          let field
          if (user.username.toUpperCase() === username.toUpperCase()) {
            field = 'Username'
          } else {
            field = 'Email'
          }
          const Error = `${field} already exist`
          reject(Error)
        }
        resolve()
      })
  })
  return promise
}

class Users {
  /**
   * @description User signup method
   *
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   *
   * @returns {object} object
   */
  static async signUp (req, res) {
    const name = req.body.name
    const username = req.body.username
    const email = req.body.email
    const imageUrl = req.body.imageUrl
    let password = trimUserData(req.body.password, '')
    password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    const errors = await inputValidation(req, res)
    if (errors) {
      return res.status(400).send(errors)
    }
    const check = await userNameAndEmailValidation(username, email)
    if (check) {
      const user = await User.create({name, username, email, imageUrl, password})
      if (user) {
        const payload = { id: user.id, username: user.username, email: user.email }
        const token = jwt.sign(payload, secret, {
          expiresIn: '4h'
        })
        return res.status(201).json({
          success: true,
          message: 'User created successfully',
          user,
          token
        })
      }
    }
    return res.status(500).json({
      success: false,
      message: `Error creating user ${error.message}`
    })
  }

  /**
   * @description - Sign In a user (Search for user)
   *
   * @param {object} req - HTTP Request
   *
   * @param {object} res - HTTP Response
   *
   * @return {object} this - Class instance
   *
   * @memberof Users
   */
  static async signIn (req, res) {
    const Op = Sequelize.Op
    const authName = trimUserData(req.body.authName, '')
    const checkPass = trimUserData(req.body.password, '')
    const user = await User.findOne({
      where: { [Op.or]: [{ username: authName }, { email: authName }] }
    })
    if (user) {
      const { id, username, email, password } = user
      const payload = { id, username, email }
      console.log(payload)
      const token = await jwt.sign(payload, secret, { expiresIn: '4h' })
      const confirmedPass = await bcrypt.compareSync(checkPass, password)
      if (confirmedPass) {
        return res.status(200).send({
          success: true,
          user,
          token
        })
      }
      return res.status(409).send({
        success: false,
        message: 'Incorrect password'
      })
    }
    return res.status(404).send({
      success: false,
      message: 'User not found'
    })
  }
  /**
     * @description Get A User details
     * @param {object} req - Request
     * @param {object} res - Response
     * @returns {object} about User
     */
  static async listAUser (req, res) {
    const userId = req.params.userId
    try {
      const user = await User.findOne({ attributes: ['id', 'name', 'username', 'email', 'imageUrl'], where: { id: userId } })
      if (user) {
        const { id, name, username, email, imageUrl } = user
        const userInfo = { userId: id, name, username, email, imageUrl }
        const recipeCount = await Recipe.count({ where: { userId } })
        const reviewCount = await Review.count({ where: { userId } })
        const favoriteCount = await Favorite.count({ where: { userId } })
        if (user && recipeCount >= 0 && reviewCount >= 0 && favoriteCount >= 0) {
          const userInfo = { userId: user.id, name: user.name, username: user.username, email: user.email, imageUrl: user.imageUrl }
          userInfo.recipeCount = recipeCount
          userInfo.reviewCount = reviewCount
          userInfo.favoriteCount = favoriteCount
          return res.status(200).send({
            success: true,
            userInfo,
            message: 'User and counts succesful'
          })
        }
        throw new Error('Error: cannot count various recipes and others')
      }
      throw new Error('User not found')
    } catch (err) {
      let message = err.message
      res.status(404).send({
        success: false,
        message: message
      })
    }
  }
  static destroy (req, res) {
    return User
      .findById(req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(400).send({
            message: 'User Not Found'
          })
        }
        return user
          .destroy()
          .then(() => res.status(200).send({
            message: 'We are sorry to let you go'
          }))
          .catch(error => res.status(400).send(error))
      })
      .catch(error => res.status(400).send(error))
  }
}

export default Users
