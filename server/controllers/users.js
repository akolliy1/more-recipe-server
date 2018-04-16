import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import Sequelize from 'sequelize'
import model from '../models'

const { User, Recipe, Review } = model;

class Users {
   /**
   * @description User signup method
   *
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   *
   * @returns {object} object
   */
    static signUp(req, res) {
        const { name, username, email } = req.body
        let { password } = req.body;
        password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        return User
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
                res.status(201).send(user)
            })
            .catch(error => res.status(400).send(error));
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
