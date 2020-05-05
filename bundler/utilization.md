#### Utilization

```js

import validator from 'vuejs-validators';

let form = {
    name: null,
    email: null,
    password: null,
    phone_number: null,
    confirm_password: null,
    terms_of_service: 'no',
};

let rules = {
    name: 'required|min:4|string|max:10',
    email: 'required|email|min:4|max:12',
    password: 'required|same:confirm_password|min:8',
    confirm_password: 'required|min:8',
    phone_number: 'required|phone',
    terms_of_service: 'truthy|required',
};

let messages = {
    'name.required': ':attribute is a required field',
    'name.min': ':attribute can not be less than :min characters',
    'name.string': ':attribute must be a string',
    'name.max': ':attribute may not be more than :max characters',
    'email.required': ':attribute is required',
    'email.email': ':attribute must be an email address',
    'email.min': ':attribute may not be less than :min',
    'email.max': ':attribute may not be more than :max',
    'password.same': ':attribute must have the same value as :same',
    'password.min': ':attribute may not be less than :min',
    'password.required': ':attribute is a required field',
    'phone_number.required': ':attribute is a required field',
    'phone_number.phone': ':attribute must be a valid phone number',
    'terms_of_service:truthy': ':attribute must have a truthy value ("on", "On", "yes", "Yes", "1", 1, true, "true")',
    'terms_of_service:required': ':attribute is required',
};

let validation = validator(form, rules, messages);

 /***
 *********************************
 ** Validation Life Cycle Hooks **
 *********************************
 * Hooks
 **********
 * Prepare
 * Failed
 * Passed
 *
 *******
 * 1. Pass multiple callbacks to the validator life cycle hooks
 *************
 * validator.prepare(validator => console.log('preparing to validate: ', validator);
 * validator.prepare(callbackTwo);
 *
 **
 * Validator.failed(validator => console.log('errors', validator.getErrors());
 * Validator.failed(validator => validator.errors.name.push('Add/append custom error message')
 *
 **
 * validator.passed(validator => { console.log(validator});
 * validator.passed(successTwo);
 * validator.passed(successThreeCallback);
 *
 *********
 * 2. Accept the validator instance as their callback parameter
 ****************
 *   A: Callback being passed to the prepare life cycle hook:
 *     ~ validator.prepare(callback);
 *   B: It except an instance of the validator Or
 *      ~ validator.prepare(validator => console.log(
 *           validator.data,
 *           validator.rules,
 *           validator.messages,
 *           validator.errors
 *       ));
 *
 *********
 * 3. All life cycle hooks Are FORGOTTEN
 **************
 *    A: After execution callbacks/hooks are forgotten
 *    B: This is to prevent "accidentally" adding hooks over and over again (Especially in reactive frameworks)
 *
 ***


/**
 * Extend Validation In Real Time Using Prepare LIfe Cycle Hook
 ********
 * validator with additional rule and message by hooking into the prepare life cycle hook*
 ***/

validation.prepare(validator => {
    validator.extend({
       uppercase: [
            ':attribute must be uppercase',
            ({ value, validator, parameters }) => value === value.toUpperCase()
       ],
    });
});

/* "Passed Validation Example"
/*********************************
* ~ "Only submit form data when it passes validation
**/

validation.passed(
    validator => axios.post('/login', validator.data).then(response =>
    {
        this.$router.to('/home');
    });
);


/* "Failed Validation Example"
/********************************
* ~ "Flash" Error Messages, but only when validation fails
**/

const VueComponent = this;

validation.failed(validator => {
    /** Pass errors to vue component data property to display */
    VueComponent.errors = validator.getErrors();

    /** Set timeout, reset "Component" errors to empty array, removing errors from user display */
    window.setTimeout(() => {  VueComponent.errors = []; }, 5000)
});


/** "Validate"
/*******************
* ~ "Validate"
*      1. Prepares for validation
*      2. Validates the form data
*      3. Populares the validation.errors object
*      4. Determines whether to trigger the "passed" callbacks or the "failed" callbacks
**/
validation.validate()
