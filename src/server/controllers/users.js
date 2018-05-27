import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Sequelize from 'sequelize'
import trimUserData from '../utility/trimUserData'
import { inputValidation } from '../middlewares/inputValidation'
import { User, Recipe, Review, Favorite } from '../models'
const secret = process.env.JWT_SECRET
const that
const Op = Sequelize.Op

/**
 * @description Validate username and Email
 * @param {object} Username
 * @param {object} Email
 * @returns {Promise} if validated
 */
const userNameAndEmailValidation = (username, email) => {
  const promise = new Promise((resolve, reject) => {
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
          reject(`${field} already exist`)
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
  static signUp (req, res) {
    // console.log(req)
    const { name, username, email } = req.body
    let password = req.body.password
    password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    const errors = inputValidation(req, res)
    if (errors) {
      return res.status(400).send(errors)
    } else {
      userNameAndEmailValidation(username, email).then(() => {
        User
          .create({
            name,
            username,
            email,
            imageUrl: '',
            password
          })
          .then((user) => {
            const payload = { id: user.id, username: user.username, email: user.email }
            const token = jwt.sign(payload, secret, {
              expiresIn: '3h'
            })
            res.status(201).json({
              success: true,
              message: 'User created successfully',
              user
            })
          })
          .catch(error => res.status(500).json({
            success: false,
            message: `Error creating user ${error.message}`
          }))
      })
        .catch(error =>
          res.status(409).json({
            success: false,
            message: error
          })
        )
    }
    return this
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
    const password = trimUserData(req.body.password, '')
    const authName = trimUserData(req.body.authName, '')
    const user = await User.find({
      attributes: ['id', 'name', 'username', 'email', 'password'],
      where: { [Op.or]: [{ username: authName }, { email: authName }] }
    })
    if (user) {
      const { id, username, email, password } = user
      const payload = { id, username, email }
      const token = jwt.sign(payload, secret, { expiresIn: '4h' })
      const confirmedPass = await bcrypt.compareSync(req.body.password, password)
      if (confirmedPass) {
        return res.status(200).send({
          success: true,
          message: 'Signin successfuly',
          user, 
          token
        })
      }
      return res.status(400).send({
        msg: 'Incorrect password'
      })
    }
    return res.status(500).send({
      success: false,
      message: 'internal server Error '
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
      throw new Error('Failed to find User and the recipes')
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
