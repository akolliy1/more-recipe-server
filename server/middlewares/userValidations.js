import trimData from "../utility/trimUserData";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import model from '../models';
dotenv.config();
import Sequelize from "sequelize";
/**
 * @description Validate User data
 * @param req -  request
 * @param res - respond
 * @param next - next
 * @returns { object } json object
 */
const { User } = model
class Validations {
    static async validateUserSignin(req, res, next) {
        const { authName, password } = req.body;
        const Op = Sequelize.Op
        if (!authName) {
            return res.status(400).send({
                errors: [{
                    message: 'Username field cannot be empty'
                }]
            });
        }
        if (!password) {
            return res.status(400).send({
                errors: [{
                    message: 'Password field cannot be empty'
                }]
            });
        }
        const findUser = await User.find({
            where: {
                [Op.or]: [{username: authName},{email: authName}]
            },
        });
        if (!findUser) {
            return res.status(400).send({
                errors: [{
                    message: 'Incorrect login details'
                }]
            });
        }
        console.log(findUser.password,req.body.password)
        if (bcrypt.compareSync(req.body.password, findUser.password)) {
            next();
        } else {
            res.status(400).send({
                errors: [{
                    message: 'Incorrect login details'
                }]
            });
        }
    }
}
export default Validations