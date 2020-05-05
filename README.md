[![npm version](https://img.shields.io/npm/v/vuejs-validators.svg?style=flat-square)](http://badge.fury.io/js/vuejs-validators)
[![npm license](https://img.shields.io/npm/l/vuejs-validators.svg?style=flat-square)](http://badge.fury.io/js/vuejs-validators)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![dependencies](https://img.shields.io/badge/dependencies-none-brightgreen.svg?style=flat-square)](https://github.com/zhorton34/vuejs-validators/blob/master/package.json)


# Vuejs Validators

> Form Validation Simplified


# Use vuejs-validations Along Side vuejs-form
(Created in parrallel, but seperate repos keeps validation & form logic decoupled. Both repos have zero non-dev dependencies)

https://github.com/zhorton34/vuejs-form
```js
<template>
    <div>
        <input type='text' v-model='form.name' /> <br>
        <input type='email' v-model='form.email' /> <br>
        <input type='password' v-model='form.password' /> <br>
        <input type='password' v-model='form.confirm_password' /> <br>
        <hr>
        <button :disabled='form.empty()' @click='submit'>
            Complete
        </button>
    </div>
</template>

<script>
    import form from 'vuejs-form' 
    import validator from 'vuejs-validators'

    export default {
       data: () => ({
            form: form({ 
                name: '', 
                email: '', 
                password: '', 
                confirm_password: ''
            }),

            validator: validator(form, {
                name: 'required|min:5',
                email: 'email|min:5|required',
                password: 'required|same:confirm_password',
                confirm_password: 'min:6',
            }),
       }),

        created() {            
            this.validator.data = this.form.all();
        },
        
        methods: {
            failed(validator) {
                console.log('validator errors: ', validator.errors)
            },
            passed(validator) {
                console.log('passed: ', validator);
            },

            submit() {
                this.validator.passed(validator => this.passed(validator))
                this.validator.failed(validator => this.failed(validator))

                this.validator.validate();
            }
        }
    }
</script>
```

### Installation

#### NPM

```bash
npm install --save-dev vuejs-validators
```

#### Yarn

```bash
yarn add vuejs-validators --save
```


### Available Validation Rules

Below is a list of all available validation rules and their function:


- [accepted](#accepted-rule)
- [alpha](#alpha-rule)
- [alpha_dash](#alpha_dash-rule)
- [alpha_num](#alpha_num-rule)
- [array](#array-rule)
- [between](#between-rule)
- [boolean](#boolean-rule)
- [email](#email-rule)
- [json](#json-rule)
- [max](#max-rule)
- [min](#min-rule)
- [not_regex](#not_regex-rule)
- [not_within](#not_within-rule)
- [number](#number-rule)
- [numeric](#numeric-rule)
- [phone](#phone-rule)
- [regex](#regex-rule)
- [required](#required-rule)
- [same](#same-rule)
- [string](#string-rule)
- [url](#url-rule)
- [within](#within-rule)

### Accepted Rule

> The field under validation must be yes, on, 1, or true. This is useful for validating "Terms of Service" acceptance.

> `Passing Accepted Rule`
```js
import validator from 'vuejs-validators';

let form = { terms_of_service: 'no' }
let rules = { terms_of_service: 'accepted' }

validator(form, rules).validate();
```

> `Failing Accepted Rule`
```js
import validator from 'vuejs-validators';

let form = { terms_of_service: null }
let rules = { terms_of_service: 'accepted' }

validator(form, rules).validate();
```


### Alpha Rule

> The field under validation must be entirely alphabetic characters.

> `Passing Alpha Rule`
```js
import validator from 'vuejs-validators';

let form = { letters: 'asdeddadfjkkdjfasdf' };
let rules = { letters: ['alpha'] };

validator(form, rules).validate();
```

> `Failing Alpha Rule`
```js
import validator from 'vuejs-validators';

let form = { letters: '5-@'}
let rules = { letters: ['alpha'] }

validator(form, rules).validate();
```


### Alpha Dash Rule

> The field under validation may have alpha-numeric characters, as well as dashes and underscores.

> `Passing Alpha Dash Rule`

```js
import validator from 'vuejs-validators';

let form = { slug: 'user_name' };
let rules = { slug: ['alpha_dash'] };

validator(form, rules).validate();
```

> `Failing Alpha Dash Rule`
```js
import validator from 'vuejs-validators';

let form = { words: 'hello world'}
let rules = { words: ['alpha_dash'] }

validator(form, rules).validate();
```

### Alpha Num Rule

> The field under validation must be entirely alpha-numeric characters.

> `Passing Alpha Num Rule`

```js
import validator from 'vuejs-validators';

let form = { key: '4asdasdfe4d23545w634adf' };
let rules = { key: ['alpha_num'] };

validator(form, rules).validate();
```

> `Failing Alpha Num Rule`
```js
import validator from 'vuejs-validators';

let form = { identifier: '1-asdf4adf_d_42'}
let rules = { identifier: ['alpha_num'] }

validator(form, rules).validate();
```

### Array Rule

> The field under validation must be a JS array.

> `Passing Array Rule`
```js
import validator from 'vuejs-validators';

let form = { list: ['banana', 'broccoli', 'carrot'] };
let rules = { list: 'array' };

validator(form, rules).validate();
```

> `Failing Array Rule`
```js
import validator from 'vuejs-validators';

let form = { options: { name: 'hey world' } }
let rules = { options: 'array' }

validator(form, rules).validate();
```


### Email Rule

> The given field value must be an email

> `Passing Email Rule`
```js
import validator from 'vuejs-validators';

let form = { email: 'example@cleancode.studio' };
let rules = { email: ['email'] };

validator(form, rules).validate();
```

> `Failing Email Rule`
```js
import validator from 'vuejs-validators';

let form = { email: 'asdfsdaf@.net'}
let rules = { email: ['email'] }

validator(form, rules).validate();
```


### Boolean Rule

> Boolish validation, not strict boolean check
> Validates that field value is "truthy" or "falsy"

> `Falsy Values`
```js
let falsy = [
    0, '0',
    'no', 'No', 'NO',
    'off', 'Off', 'OFF',
    false, 'false', 'False', 'FALSE',
];
```

> `Truthy values`
```js
let truthy = [
    1, '1',
    'on', 'On', 'ON',
    'yes', 'Yes', 'YES',
    true, 'true', 'True', 'TRUE',
];
```

> `Passing Boolean Rule`
```js
import validator from 'vuejs-validators';

let form = { selected: 'Yes' };
let rules = { selected: ['boolean'] };

validator(form, rules).validate();
```

> `Failing Boolean Rule`
```js
import validator from 'vuejs-validators';

form = { selected: null };
rules = { selected: ['boolean'] };

validator(form, rules).validate();
```


### Email Rule

> The given field value must be an email

> `Passing Email Rule`
```js
import validator from 'vuejs-validators';

let form = { email: 'example@cleancode.studio' };
let rules = { email: ['email'] };

validator(form, rules).validate();
```

> `Failing Email Rule`
```js
import validator from 'vuejs-validators';

let form = { email: 'asdfsdaf@.net'}
let rules = { email: ['email'] }

validator(form, rules).validate();
```


### Json Rule

> The given field value must be a Json String

> `Passing Json Rule`
```js
import validator from 'vuejs-validators';

let form = { content: JSON.stringify({ inspire: 'love' }) };
let rules = { content: 'json' };

validator(form, rules).validate();
```

> `Failing Json Rule`
```js
import validator from 'vuejs-validators';

let form = { content: 'fasdf' }
let rules = { content: 'json' }

validator(form, rules).validate();

### Max Rule

> The given field must not be more than the defined maximum limit

> `Passing Max Limit Rule`
```js
import validator from 'vuejs-validators';

let form = { password: 'secret' }
let rules = { password: 'max:10' }

validator(form, rules).validate();
```

> `Failing Max Limit Rule`
```js
import validator from 'vuejs-validator'

let form = { password: 'secret'}
let rules = { password: 'max:4' }

validator(form, rules).validate();
```


### Min Rule

> The given field must not be less than the defined minimum limit

> `Passing Min Limit Rule`
```js
import validator from 'vuejs-validators';

let form = { password: 'secret' }
let rules = { password: 'min:6' }

validator(form, rules).validate();
```

> `Failing Min Limit Rule`
```js
import validator from 'vuejs-validator'

let form = { password: 'secret'}
let rules = { password: 'min:8' }

validator(form, rules).validate();
```


### Not Regex Rule

> The given field value must NOT match the regular expression pattern

> `Passing Not Regex Rule`
```js
import validator from 'vuejs-validators';

let form = { email: 'ex.-fn' };
let rules = { email: ['regex:/^.+@.+$/i'] };

validator(form, rules).validate();
```

> `Failing Not Regex Rule`
```js
import validator from 'vuejs-validators';

let form = { email: 'example@gmail.com'}
let rules = { email: ['regex:/^.+@.+$/i'] }

validator(form, rules).validate();
```


### Not Within Rule

> The given field must NOT be "within" the comma delimited list of items

> `Passing Not Within Rule`
```js bash
import validator from 'vuejs-validators';

let form = { language: 'PigLatin' }
let rules = { language: 'not_within:German,Spanish,English,Latin' }

validator(form, rules).validate();
```

> `Failing Not Within Rule`
```js
import validator from 'vuejs-validators';

let form = { pencil: '2a'};
let rules = { pencil: 'not_within:notebook,pencil,marker,sharpie,whiteboard' };

validator(form, rules).validate();
```


### Number Rule

> The given field must be a Number (Strict Typed Check). See Numeric For Looser Type Checking

> `Passing Number Rule`
```js
import validator from 'vuejs-validators';

let form = { id: 15 };
let rules = { id: ['number'] };

validator(form, rules).validate();
```

> `Failing Number Rule`
```js
import validator from 'vuejs-validators';

let form = { id: '15'}
let rules = { id: ['number'] }

validator(form, rules).validate();
```


### Numeric Rule

> Determine if a value is numeric, or is a string that can properly represent a numeric

- Numerical value, not strict number check
- Automatically attempts to cast value to numerical value.
- Validates that field value an integer, decimal, or bigInt.

> `Passing Numeric Rule`
```js
import validator from 'vuejs-validators';

let form = { members: '25' }
let rules = { member: ['numeric'] }

validator(form, rules).validate();
```

> `Failing Numeric Rule`
```js
import validator from 'vuejs-validators';

let form = { members: 'yes' }
let rules = { member: ['numeric'] }

validator(form, rules).validate();
```


### Phone Rule

> The given field value must be a phone number

> `Passing Phone Rule`
```js
import validator from 'vuejs-validators';

let form = { send_sms: ['555-555-5555'] }
let rules = { send_sms: ['phone'] }
validator(form, rules).validate();
```

> `Failing Phone Rule`
```js
import validator from 'vuejs-validators';

let form = { send_sms: '+(3) - 4 32'}
let rules = { send_sms: ['phone'] }

validator(form, rules).validate();
```

> `Phone Number Formats Within Testing Coverage`
- +61 1 2345 6789
- +61 01 2345 6789
- 01 2345 6789
- 01-2345-6789
- (01) 2345 6789
- (01) 2345-6789
- 5555555555
- (555) 555 5555
- 555 555 5555
- +15555555555
- 555-555-5555

> _(Any contributions welcome for improving regex validation patterns for current rules as well as adding new rules)_


### Regex Rule

> The given field value must match the regular expression pattern

> `Passing Regex Rule`
```js
import validator from 'vuejs-validators';

let form = { email: 'example@gmail.com' };
let rules = { email: ['regex:/^.+@.+$/i'] };

validator(form, rules).validate();
```

> `Failing Regex Rule`
```js
import validator from 'vuejs-validators';

let form = { email: 'ex.-fn'}
let rules = { email: ['regex:/^.+@.+$/i'] }

validator(form, rules).validate();
```


### Required Rule

> Validates that a given field exists and its value is set

> `Passing Required Rule`
```js
import validator from 'vuejs-validators';

let form = { name: 'jules' };
let rules = { name: ['required'] };

validator(form, rules).validate();
```

> `Failing Required Rule`
```js
import validator from 'vuejs-validators';

let form = {};
let rules = { name: ['required'] };

validator(form, rules).validate();
```


### Same Validation Rule

> The given field value is the same as another field value

> `Passing Same Rule`
```js bash
import validator from 'vuejs-validators';

let form = { password: 'secret', confirm_password: 'secret' }
let rules = { password: 'same:confirm_password' }

validator(form, rules).validate();
```

> `Failing Same Rule`
```js bash
import validator from 'vuejs-validators';

let form = { password: 'asdfasdfasdf', confirm_password: 'secret' };
let rules = { password: 'same:confirm_password' };

validator(form, rules).validate();
```


### String Rule

> The given field value must be a String

> `Passing String Rule`
```js
import validator from 'vuejs-validators';

let form = { name: 'sammie' };
let rules = { name: 'string' };

validator(form, rules).validate();
```

> `Failing String Rule`
```js
import validator from 'vuejs-validators';

let form = { name: 54345  }
let rules = { name: 'string' }

validator(form, rules).validate();
```


### Url Rule

> The given field value must be an http(s) url

> `Passing Url Rule`
```js
import validator from 'vuejs-validators';

let form = { link: 'https://cleancode.studio' };
let rules = { link: 'url' };

validator(form, rules).validate();
```

> `Failing Url Rule`
```js
import validator from 'vuejs-validators';

let form = { link: 'httP/ope_type@.net'}
let rules = { link: 'url' }

validator(form, rules).validate();
```


### Within Rule

> The given field must be "within" the comma delimited list of items

> `Passing Within Rule`
```js bash
import validator from 'vuejs-validators';

let form = { name: 'Sam' }
let rules = { name: 'within:James,Boronica,Sam,Steve,Lenny' }

validator(form, rules).validate();
```

> `Failing Within Rule`
```js
import validator from 'vuejs-validators';

let form = { name: 'jake'};
let rules = { name: 'within:patricia,veronica,samuel,jeviah' };

validator(form, rules).validate();
```


### Utilization

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

```


#### Extend Validators

## `extend Validator`

> Simple set up to add your own Validation Rules

```js bash
import validator from 'vuejs-validators';

let input = {};
let rules = {};
let messages = {};
let validation = validator(input, rules, messages)
```

#### Extend Option 1: Single Rule/Message Pair
```js
validation.extend('uppercase', [
    ':attribute must be uppercase',
    ({ value, validator, parameters }) => value === value.toUpperCase(),
]);
```

**TIP: Console.Log Context Validation**
--------
> _For more advanced fields (Ex: "Required If", "Same As Fields")_
> _you may need the entire validation "context" object._
> _To see the entirety of our provided validation context, hook into_
> _a rule validator method, pass through a single; non-deconstructed parameter,_
> _and console.log it (Checkout the example directly below)_


**Console Log The Validation Context**
-------
> _Cool Tip Example: Log The Validation Context Object To Your Console_
``` js
validation.extend('uppercase', [
    ':attribute must be uppercase',
    // context
    context => {
        // console.log it to check it out
        console.log({ context });

        return context.value === context.value.toUpperCase(),
    }
]);
```


### Extend Option Two: Add Multiple Rules And Messages
``` js
validation.extend({
    uppercase: [
       ':attribute must be uppercase',
        ({ value }) => value === value.toUpperCase(),
    ],
    notuppercase: [
        ':attribute must not be uppercase',
        ({ value }) => value !== value.toUpperCase()
    ],
    required_without: [
        ':attribute is only required when form is missing :required_without field',
        ({ validator, parameters }) => !Object.keys(validator.data).includes(parameters[0])
    ],
    required_with: [
        ':attribute is required with the :required_with field',
        ({ validator, parameters }) => Object.keys(validator.data).includes(parameters[0])
    ],
});
```


### Contribute

PRs are welcomed to this project.
If you want to improve the vuejs-validators library, add
functionality or improve the docs please feel free to submit a PR.


### License

MIT © [Zachary Horton (Clean Code Studio)](https://github.com/zhorton34/vuejs-validators#README)
