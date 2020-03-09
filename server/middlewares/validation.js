const {
    check
} = require('express-validator')

const validateRegistrationBody = () => {
    return [
        check('name').exists().withMessage('name is required').isLength({
            min: 3
        }).withMessage('name must be greater than 3 letters'),
        check('email').exists().withMessage('email is required').isEmail().withMessage('email is invalid'),
        check('password').exists().withMessage('password is required').isLength({
            min: 8,
            max: 12
        }).withMessage('password must be in between 8 to 12 characters long')

    ]
}

const validateLoginBody = () => {
    return [
        check('email').exists().withMessage('email is required').isEmail().withMessage('email is invalid'),
        check('password').exists().withMessage('password is required').isLength({
            min: 8,
            max: 12
        }).withMessage('password must be in between 8 to 12 characters long')
    ]
}

module.exports = {
    validateRegistrationBody,
    validateLoginBody
}