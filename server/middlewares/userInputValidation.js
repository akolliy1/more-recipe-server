import models from "../models";
/**
 * @description User input data for email
 * @param { User } User models
 * @param { req } req
 * @param { res } res
 * @param { next } next - next step if no problem
 * @returns {Promise} promise
 */

const { User, Recipe } = models
class userAndEmail {
    static userNameValidation (req, res, next) {
        const promise = new Promise((resolve, reject) => {
            User
            .findOne({
                where: {
                    username: req.body.username,
                }
            })
            .then((user) => {
                if(!user) {
                    resolve(
                        User
                        .findOne({
                            where: {
                                email: req.body.email
                            }
                        })
                        .then((email) => {
                            if(!email) {
                                resolve()
                            } else {
                                reject(res.status(409).send({
                                    success: false,
                                    message: `Email already exist`
                                }))
                            }
                        })
                    )
                } else {
                    reject(res.status(409).send({
                        success: false,
                        message: 'Username have been taken'
                    }))
                }
                next()
            })
        })
        return promise;
    }
/**
 * @description User email
 * @param {res}
 */
}
export default userAndEmail