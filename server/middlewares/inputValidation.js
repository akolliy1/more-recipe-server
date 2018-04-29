import models from "../models";
import trimUserData from "../utility/trimUserData";
/**
 * @description User input data for email and username 
 * @memberOf Users
 * @param { object } req -request
 * @param { object } res - respond
 * @returns {object} promise
 */

const { Recipe } = models
export const inputValidation = ( req, res) => {
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
                options: [(/^[A-Za-z][^ ]+( [a-z]+)*$/gi)],
                errorMessage: 'Invalid name, ensure you name contain only alphabets and no illegal spacing'
            }
        },
        username: {
            notEmpty: {
                options: true,
                errorMessage: 'Username field cannot be empty'
            },
            isLength: {
                options: [{ min: 3 }],
                errorMessage: 'Username should be atleast 3 characters'
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
        return allErrors
    }
}

export const signInValidation = (authName, password) => {
    let message,
        field,
        errors = [];

    if(!authName) {

        message = 'Field cannot be empty';
        field = 'username';
        errors.push({message,field});

    }   
    if (authName) {
        let length,
        isLength = authName.length;

        if(isLength < 3) {

            message = 'username cannot be less than 3 character';
            field = 'username';
            errors.push({message, field});

        }
    }
    if (!password) {
        
        message = 'password cannot be empty';
        field = 'Password';
        errors.push({message, field})

    } 
    if (password) { 
        if(password.length < 8) {

            message = 'password cannot be less than 8 character';
            field = 'password';
            errors.push({message, field})

        }
    }
    return errors
}