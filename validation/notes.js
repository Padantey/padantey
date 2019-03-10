const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data){
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.author = !isEmpty(data.author) ? data.author : '';
    data.price = !isEmpty(data.price) ? data.price : '';
    data.page = !isEmpty(data.page) ? data.page : '';
    data.quality = !isEmpty(data.quality) ? data.quality : '';
    data.description = !isEmpty(data.description) ? data.description : '';
    data.subject = !isEmpty(data.subject) ? data.subject : '';



    if(!validator.isLength(data.name,{min: 5, max: 50})){
        errors.name = 'Name Must be between 5 & 50 characters.. ';
    }
    if(validator.isEmpty(data.name)){
        errors.name = 'Name field can not be empty';
    }
    
    if(!validator.isLength(data.author,{min: 5 ,max: 50})){
        errors.author = 'Author name must be a full name';
    }
    if(validator.isEmpty(data.author)){
        errors.author = 'Author field can not be empty';
    }
    
    if(!validator.isNumeric(data.price)){
        errors.price = 'Invalid Price!';
    }
    if(validator.isEmpty(data.price)){
        errors.price = 'Price field can not be empty';
    }
    
    if(!validator.isNumeric(data.page)){
        errors.page = 'Invalid Page!!';
    }
    if(validator.isEmpty(data.page)){
        errors.page = 'Number of pages field can not be empty';
    }
    
    
    if(!validator.isLength(data.description,{min: 10, max: 300})){
        errors.description = 'Description Should be between 10 to 300 characters!';
    }
    if(validator.isEmpty(data.description)){
        errors.description = 'Password field can not be empty';
    }
    
    
    return {
        errors,
        isValid: isEmpty(errors) //checks if error is empty
    };

};