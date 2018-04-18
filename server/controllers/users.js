import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import Sequelize from 'sequelize'
import { User, Recipe, Review, Favorite } from '../models';
// import inputValidations from "../middlewares/userInputValidation";

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
    static signUp({ body }, res) {
        console.log(body)
        const name = body.name,
              username = body.username,
              email = body.email;
        let password = body.password;
        password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

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
                const payload = {id: user.id,username: user.username,email: user.email };
                const token = jwt.sign(payload,process.env.JWT_SECRET,{
                    expiresIn: '24h'
                });
                res.status(201).send({
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
            where: {
                [Op.or]: [{username: req.body.username},{email: req.body.email}],
            }
        })
        .then((user) => {
            if(!user) {
                return res.status(401).json('User not found')
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
