const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = (data) => {
    let errors = {};

    data.title = !isEmpty(data.title) ?  data.title : '';
    data.type = !isEmpty(data.type) ?  data.type : '';
    data.text = !isEmpty(data.text) ?  data.text : '';

    if (Validator.isEmpty(data.title)) {
        errors.title = 'Post title is required!';
    }

    if (Validator.isEmpty(data.text)) {
        errors.text = 'Post text is required!';
    }
    if (Validator.isEmpty(data.type)) {
        errors.type = 'Post type is required!';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};