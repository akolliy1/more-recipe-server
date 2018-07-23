import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Sequelize from 'sequelize';
import trimUserData from '../utility/trimUserData';
import inputValidation from '../middlewares/inputValidation';
import { User, Recipe, Review, Favorite } from '../models';

const secret = process.env.JWT_SECRET;
const { Op } = Sequelize;

/**
 * @description Validate username and Email
 * @param {object} username
 * @param {object} email
 * @returns {Promise} if validated
 */
const userNameAndEmailValidation = (username, email) => {
  const promise = new Promise((resolve, reject) => {
    User
      .findOne({
        attributes: ['email', 'username'],
        where: {
          $or: [
            {
              username: {
                $iLike: username
              }
            }, {
              email: {
                $iLike: email
              }
            }
          ]
        }
      })
      .then((userFound) => {
        if (userFound) {
          let field;
          if (userFound.username.toUpperCase() === username.toUpperCase()) {
            field = 'Username';
          } else {
            field = 'Email';
          }
          const error = `${field} already exist`;
          reject(error);
        }

        resolve();
      });
  });
  return promise;
};

/**
 * @class Users
 */
class Users {
  /**
   * @description User signup method
   *
   * @param {object} req HTTP request object
   *
   * @param {object} res HTTP response object
   *
   * @returns {object} object
   */
  static async signUp(req, res) {
    // console.log(req)
    const { name, username, email } = req.body;
    let { password } = req.body;
    password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const errors = await inputValidation(req, res);
    if (errors) return res.status(400).send(errors);
    userNameAndEmailValidation(username, email).then(() => {
      User
        .create({
          name,
          username,
          email,
          imageUrl: '',
          password
        })
        .then((result) => {
          const token = jwt.sign({
            id: result.id,
            username: result.username,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
          }, secret);

          return res.status(201).json({
            success: true,
            message: 'New user created/token generated!',
            token
          });
        })
        .catch(error => res.status(500).json({
          success: false,
          message: `Error creating user ${error.message}`
        }));
    }).catch(error =>
      res.status(409).json({
        success: false,
        message: error
      }));
    return this;
    // const newUser = await User.create({
    //   name, username, email, imageUrl: '', password
    // });
    // if (newUser) {
    //   const payload = {
    //     id: newUser.id,
    //     username: newUser.username,
    //     email: newUser.email
    //   };
    //   const token = await jwt.sign(payload, secret, {
    //     expiresIn: '6h'
    //   });
    //   return res.status(201).send({
    //     success: true,
    //     message: 'User created successfully',
    //     token
    //   });
    // } return res.status(500).send({
    //   success: false,
    //   message: 'Error creating new user'
    // });
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
  static async signIn(req, res) {
    const username = trimUserData(req.body.username);
    const email = trimUserData(req.body.username);
    const user = await User
      .findOne({ where: { [Op.or]: { username, email } } });
    if (user) {
      const { password } = user;
      const compared = await bcrypt.compareSync(trimUserData(req.body.password), password);
      if (compared) {
        /* eslint-disable no-shadow */
        const { id, username, email } = user;
        const payload = { id, username, email };
        const token = jwt.sign(payload, secret, { expiresIn: '6h' });
        return res.status(200).send({
          success: true,
          message: 'successfuly signin',
          token
        });
      }
      return res.status(400).send({
        success: false,
        message: 'Incorrect pasword'
      });
    }
    return res.status(404).send({
      success: false,
      message: 'user not found'
    });
  }
  /**
     * @description Get A User details
     * @param {object} req - Request
     * @param {object} res - Response
     * @returns {object} about User
     */
  static async listAUser(req, res) {
    const { decoded } = req;
    const userId = decoded.id;
    const user = await User.findOne({ attributes: ['id', 'name', 'username', 'email', 'imageUrl'], where: { id: userId } });
    const recipeCount = await Recipe.count({ where: { userId } });
    const reviewCount = await Review.count({ where: { userId } });
    const favoriteCount = await Favorite.count({ where: { userId } });
    if (user && recipeCount >= 0 && reviewCount >= 0 && favoriteCount >= 0) {
      const userInfo = { user };
      userInfo.recipeCount = recipeCount;
      userInfo.reviewCount = reviewCount;
      userInfo.favoriteCount = favoriteCount;
      return res.status(200).send({
        success: true,
        user: userInfo,
        message: 'User and counts succesful'
      });
    } return res.status(404).send({
      success: false,
      message: 'Failed to find User and the recipes'
    });
  }
  /**
   * @description User Update
   * @param {req} req
   * @param {res} res
   * @return {object} user Update feedback
   */
  static async updateUser(req, res) {
    const { decoded } = req;
    const { name, email, imageUrl } = req.body;
    const user = await User.findById(decoded.id);
    if (user) {
      const update = await user.update({
        name: name || user.name,
        email: email || user.email,
        username: user.username,
        imageUrl: imageUrl || user.imageUrl
      });
      return res.status(201).send({
        success: true,
        message: 'updated successfully',
        update
      });
    }
  }
  /**
   * @description delete User
   * @param {req} req
   * @param {res} res
   * @returns {object} deleted
   */
  static destroy(req, res) {
    const { decoded } = req;
    return User
      .findById(decoded.id)
      .then((user) => {
        if (!user) {
          return res.status(400).send({
            message: 'User Not Found'
          });
        }
        return user
          .destroy()
          .then(() => res.status(200).send({
            message: 'We are sorry to let you go'
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
}

export default Users;
