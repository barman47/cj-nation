const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = (data) => {
    let errors = {};

    data.text = !isEmpty(data.text) ?  data.text : '';
    data.user = !isEmpty(data.user) ?  data.user : '';

    if (Validator.isEmpty(data.user)) {
        errors.user = 'User is required!';
    }

    if (Validator.isEmpty(data.text)) {
        errors.comment = 'Comment is required!';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};