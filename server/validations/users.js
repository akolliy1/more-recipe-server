req.checkBody("email", "Enter a valid email address.").isEmail();

req.checkBody(
    "username",
    "Username Exist Enter another username").isle;

req.checkBody(
    "team_twitter",
    "Enter a valid Twitter URL").optional().matches("http://twitter.com/*");

req.checkBody(
    "contestant_count",
    "Contestant count must be a number and one that is divisible by 2"
).isNumber().isDivisibleBy(2);

req.checkBody(
    "page_color",
    "Page colour must be a valid hex color"
).isHexColor();


const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

app.post('/user', [
    check('username')
        // Every validator method in the validator lib is available as a
        // method in the check() APIs.
        // You can customize per validator messages with .withMessage()
        .isEmail().withMessage('must be an email')

        // Every sanitizer method in the validator lib is available as well!
        .trim()
        .normalizeEmail()

        // ...or throw your own errors using validators created with .custom()
        .custom(value => {
            return findUserByEmail(value).then(user => {
                throw new Error('this email is already in use');
            })
        }),

    // General error messages can be given as a 2nd argument in the check APIs
    check('password', 'passwords must be at least 5 chars long and contain one number')
        .isLength({ min: 5 })
        .matches(/\d/),

    // No special validation required? Just check if data exists:
    check('addresses.*.street').exists(),

    // Wildcards * are accepted!
    check('addresses.*.postalCode').isPostalCode(),

    // Sanitize the number of each address, making it arrive as an integer
    sanitize('addresses.*.number').toInt()
], (req, res, next) => {
    // Get the validation result whenever you want; see the Validation Result API for all options!
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }

    // matchedData returns only the subset of data validated by the middleware
    const user = matchedData(req);
    createUser(user).then(user => res.json(user));
});