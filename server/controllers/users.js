import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Sequelize from 'sequelize';
import trimUserData from "../utility/trimUserData";
import { inputValidation } from "../middlewares/inputValidation";;
import { User, Recipe, Review, Favorite, Upvote, Downvote } from '../models';
const secret = process.env.JWT_SECRET;

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
                        const token = jwt.sign(payload, secret, {
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
        let authName = req.body.authName;
        let password = req.body.password;
            password = trimUserData(password, '');
            authName = trimUserData(authName,'');

            return User.find({
                attributes: ['id', 'name', 'username', 'email', 'password'],
                where: {
                    [Op.or]: [{ username: authName }, { email: authName}],
                }
            })
            .then((user) => {
                if(!user) {
                    return res.status(404).send({
                        authName,
                        success: false,
                        message: 'User not found'
                        })
                } else {
                    const { id, username, email, password } = user
                    const payload = { id, username, email }
                    const token = jwt.sign(payload, secret, {
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
        .catch((/*error*/) => {
                res.status(500).send({
                    success: false,
                    message: 'internal server Error '
                })
            })
        }
    /**
     * @description Get A User details
     * @param {object} req - Request
     * @param {object} res - Response
     * @returns {object} about User
     */
    static async listAUser(req, res) {
        const userId = req.params.userId;
        try {
            const user = await User.findOne({ attributes: ['id', 'name', 'username', 'email', 'imageUrl'], where: { id: userId } });
            if(user){
                const { id, name, username, email, imageUrl } = user;
                const userInfo = { userId: id, name, username, email, imageUrl };
                const recipeCount = await Recipe.count({where: {userId}});
                console.log(`this is recipe count ${recipeCount}`);
                if(recipeCount >= 0){
                    console.log(`this is recipe count ${recipeCount}`)
                    userInfo.recipeCount = recipeCount;
                    const reviewCount = await Review.count({ where: {userId} });
                    if(reviewCount >= 0){
                        userInfo.reviewCount = reviewCount;
                        const favoriteCount = await Favorite.count({ where: {userId} });
                        if(favoriteCount >= 0){
                            userInfo.favoriteCount = favoriteCount;
                            return res.status(200).send({
                                        success: true,
                                        userInfo,
                                        message: 'User found and counts succesful '
                                    })
                        }
                        throw new Error('cannot count favorites');
                    }
                    throw new Error('cannot count reviews');
                }
                throw new Error('no recipe for count')
            }
            throw new Error('User not found');
        } catch (err) {
            let message = err.message;
            res.status(404).send({
                success: false,
                message: message
            })
        }
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
