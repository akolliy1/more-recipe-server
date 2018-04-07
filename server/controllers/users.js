import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import Sequelize from 'sequelize'
import model from '../models'

const { User, RecipeItem, RecipeComment, RecipeLike } = model;

class Users {
    static create(req, res) {
        const { name, username, email } = req.body
        let { password } = req.body;
        password = bcrypt.hashSync(password, bcrypt.genSaltSync());
        return User
            .create({
                name,
                username,
                email,
                password
            })
            .then(user => res.status(201).send(user))
            .catch(error => res.status(400).send(error));
    }
    static signin(req,res) {
        const Op = Sequelize.Op;     
        return User.find({
            where: {
                [Op.or]: [{username: req.body.username},{email: req.body.email}],
            }
        })
        .then((user) => {
            if(!user) {
                return res.status(400).json('User/email doesn\'t exist')
            } else {
                const { id, username, email, password } = user
                const payload = { id, username, email }
                const token = jwt.sign(payload, 'SECRET', {
                    expiresIn: '1h'
                })
                if(bcrypt.compareSync(req.body.password, password)) {
                    return res.status(200).send({
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