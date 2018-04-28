import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import Sequelize from 'sequelize';
import {inputValidation} from "../middlewares/inputValidation";;
import { User, Recipe, Review, Favorite, Upvote, Downvote } from '../models';

/**
 * @description Validate username and Email
 * @param {object} Username
 * @param {object} Email
 * @returns {Promise} if validated
 */
const userNameAndEmailValidation = (username, email) => {
    const promise = new Promise((resolve, reject) => {
        const Op = Sequelize.Op;
        User
            .findOne({
                attributes: ['email', 'username'],
                where: {
                    [Op.or]: [{ username: username }, { email: email }],
                }
            })
            .then((user) => {
                if (user) {
                    let field;
                    if (user.username.toUpperCase() === username.toUpperCase()) {
                        field = 'Username';
                    }
                    else {
                        field = 'Email'
                    }
                    reject(`${field} already exist`)
                }
                resolve();
            });
    });
    return promise;
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
    static signUp( req, res) {
        // console.log(req)
        const name = req.body.name,
            username = req.body.username,
            email = req.body.email;
        let password = req.body.password;
        password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const errors = inputValidation( req, res );
        if(errors) {
            return res.status(400).send(errors)
        } 
        else{
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
                        const payload = { id: user.id, username: user.username, email: user.email };
                        const token = jwt.sign(payload, process.env.JWT_SECRET, {
                            expiresIn: '24h'
                        });
                        res.status(201).json({
                            success: true,
                            message: 'User created successfully',
                            user
                        })
                    })
                    .catch(error => res.status(500).json({
                        success: false,
                        message: `Error creating user ${error.message}`
                    }));
            })
                .catch(error =>
                    res.status(409).json({
                        success: false,
                        message: error
                    })
                );
        }
        return this;
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
    static signIn(req,res) {
        const Op = Sequelize.Op;     
        return User.find({
            attributes: ['id', 'name', 'username', 'email', 'password'],
            where: {
                [Op.or]: [{ username: req.body.authName }, { email: req.body.authName}],
            }
        })
        .then((user) => {
            if(!user) {
                return res.status(401).send({
                    success: false,
                    message: 'User not found'
                    })
            } else {
                const { id, username, email, password } = user
                const payload = { id, username, email }
                const token = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: '4h'
                })
                if(bcrypt.compareSync(req.body.password, password)) {
                    return res.status(200).send({
                        success: true,
                        message: 'Signin successfuly',
                        user,
                        token
                    })
                } else {
                    return res.status(400).send({
                        msg: 'Incorrect password'
                    })
                }
                
            }
        })

    };
    /**
     * @description Get A User details
     * @param {object} req - Request
     * @param {object} res - Response
     * @returns {object} about User
     */
    static listAUser(req, res) {
        const userId = req.params.userId;
        console.log(userId)
        const promise = new Promise((resolve, reject) => {
            User
            .findOne({
                attributes: ['id', 'name', 'username', 'email', 'imageUrl'],
                where: { id: userId }
            })
            .then((user) => {
                if (!user) {
                    reject(
                        res.status(400).send({
                            success: false,
                            message: 'User not found'
                        })
                    )
                } else {
                    const { id, name, username, email, imageUrl } = user;
                    const userInfo = {userId: id, name, username, email, imageUrl};
                    Recipe
                    .count({where: {userId}})
                    .then((recipeCount) => {

                        userInfo.recipeCount = recipeCount;

                        Review.count({where: {userId}})

                        .then((reviewCount) => {
                            userInfo.reviewCount = reviewCount;

                            Favorite.count({where: {userId}})
                            .then((favoriteCount) => {
                                userInfo.favoriteCount = favoriteCount;
                                resolve(
                                    res.status(200).send({
                                        success: true,
                                        userInfo,
                                        message: 'User found and counts succesful '
                                    })
                                )
                            })
                        })
                    })
                    .catch(() => {
                        reject(
                            res.status(404).send({
                                success: false,
                                message: 'No user details found'
                            })
                        )
                    })
                }
            })
            .catch(()=> {
                reject(
                    res.status(400).send({
                        success: false,
                        message: 'Error fetching user details'
                    })
                )
            })
        })
        return promise
    }
    static destroy(req, res) {
        return User
            .findById(req.params.userId)
            .then(user => {
                if (!user) {
                    return res.status(400).send({
                        message: 'User Not Found',
                    });
                }
                return user
                    .destroy()
                    .then(() => res.status(200).send({
                        message: "We are sorry to let you go"
                    }))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    }
}

export default Users;
