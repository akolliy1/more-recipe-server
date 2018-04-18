import models from "../models";
/**
 * @description User input data for email and username 
 * @extends to controllers User file
 * @param { User } User models
 * @param { req } email - email check
 * @param { res } username - username check
 * @param { next } resolve - resolve if no problem
 * @returns {Promise} promise
 */

const { Recipe } = models
class inputValidations {
    static userNameAndEmailValidation (username, email) {
        const promise = new Promise((resolve, reject) => {
            const Op = Sequelize.Op;
            User
            .findOne({
                attributes: ['email','username'],
                where: {
                    [Op.or]: [{username: username},{email: email}],
                }
            })
            .then((user) => {
                if(user) {
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
/**
 * @description User email
 * @param {res}
 */
}
export default inputValidations