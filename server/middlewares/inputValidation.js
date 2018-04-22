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
export const inputValidation = (name='', username='', email='', password='') => {
    const promise = new Promise((resolve, reject) => {
        req.checkBody({
            name: {
                notEmpty: {
                    options: true,
                    errorMessage: 'name field cannot be empty'
                },
                isLength: {
                    options: [{ min: 3 }],
                    errorMessage: 'Name should be atleast 3 character'
                },
                matches: {
                    options: [(/^[A-Za-z][^ ]+( [^]+)*$/g)],
                    errorMessage: 'Invalid name, ensure you name contain only alphabets'
                }
            },
            username: {
                notEmpty: {
                    options: true,
                    errorMessage: 'Username field cannot be empty'
                },
                isLength: {
                    options: [{ min: 6 }],
                    errorMessage: 'Username should be atleast 6 characters'
                },
                matches: {
                    options: [(/^[a-z0-9]+$/gi)],
                    errorMessage: 'Invalid Username, kindly ensure your username is alphanumeric and no spacing'
                }
            },
            email: {
                notEmpty: {
                    options: true,
                    errorMessage: 'Email field cannot be empty'
                },
                isEmail: {
                    errorMessage: 'Please input a valid Email Adrress'
                }
            },
            password: {
                notEmpty: {
                    options: true,
                    errorMessage: 'Password field cannot be empty'
                },
                isLength: {
                    options: [{ min: 8 }],
                    errorMessage: 'Please input a valid password with atleast 8 characters'
                },
                matches: {
                    options: [(/^([^ ]+)*$/g)],
                    errorMessage: 'Invalid password, ensure your password contain only uppercase, lowercase or any special character'
                }
            }
        });
        const errors = req.validationErrors();
        if (errors) {
            const allErrors = [];
            errors.forEach((error) => {
                allErrors.push({
                    message: error.msg,
                    field: error.param
                })
            });
            reject({
                success: false,
                errors: allErrors,
            })
        }
        next()
    })
    return promise

}