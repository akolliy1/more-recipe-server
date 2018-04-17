import trimData from "../utility/trimUserData";
import jwt from "jsonwebtoken";
import model from "../models";
/**
 * @description Validate User data
 * @param req -  request
 * @param res - respond
 * @param next - next
 * @returns { object } json object
 */
class Validations {
    static userInputValidation(req, res, next) {
        const { name, username, email, password } = req.body;
        const promise = new Promise((resolve, reject) => {
            req.checkBody('name', 'Name is required')
            .notEmpty(true);
            req.checkBody(trimData('username'), 'username cannot be empty and no spacing')
            .notEmpty(true);
            req.checkBody('email', 'email address is required')
            .notEmpty(true);
            req.checkBody('email', 'email must be standard')
            .isEmail()
            req.checkBody('password', 'password is crucial for your login')
            .isLength({
                options: [{min: 6,max: 50}],
                errorMessage: 'password must not be less than 6 characters'
            })
            .notEmpty(true);
            const errors = req.validationErrors();
            if(!errors) {
                resolve();
            } 
            else {
                const allErrors = [];
                errors.forEach((error) => {
                    allErrors.push({
                        message: error.msg,
                        field: error.param
                    })
                });
                reject(res.status(401).send({
                    success: false,
                    errors: allErrors,
                }))
                console.log(allErrors)
            }
            next()
        })
        return promise
        
    }
}
export default Validations