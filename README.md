[![npm version](https://img.shields.io/npm/v/vuejs-validators.svg?style=flat-square)](http://badge.fury.io/js/vuejs-validators)
[![npm license](https://img.shields.io/npm/l/vuejs-validators.svg?style=flat-square)](http://badge.fury.io/js/vuejs-validators)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![dependencies](https://img.shields.io/badge/dependencies-none-brightgreen.svg?style=flat-square)](https://github.com/zhorton34/vuejs-validators/blob/master/package.json)


# Vuejs Validators

> Form Validation Simplified

### Table Of Contents
- [Install](#Installation)
- [Available Rules](#available-validation-rules)
- [Validator Life Cycle Hooks](#validator-life-cycle-hooks)
- [Validator Errors Api](#validator-error-api)

- [Extending](#extending)
- [Custom Messages](#extending)
- [Custom Validation Rules](#extending-custom-rules)

- [License](#license)
- [Contribute](#contribute)
- [Pull in VueJS Form, Super powerful, lightweight combo](#vuejs-form-alongside-vuejs-validators)

# Vuejs Form Alongside Vuejs Validators
> `Recommended for good vibes & simplified development`
- Created along side each other
- Each repository has zero non-dev dependencies
- Both completely separate form logic from the ui/representation of the data itself
- Separated repositories allow for using vuejs-form's and vuejs-validations independent of each other
[Recommended Vuejs Form Package](https://github.com/zhorton34/vuejs-form)

```js
<template>
    <div>
        <div v-for="(message, key) in errors" :key="`${key}.error`">
            {{ message }}
        </div>
        
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
            }).use(validator, {
                name: 'required|min:5',
                email: 'email|min:5|required',
                password: 'required|same:confirm_password',
                confirm_password: 'min:6',
            }).messages({
                'name.required': ':attribute is a required field and this is a custom message',
            }),
       }),

       watch: {
        'form.data': {
            deep: true,
            handler: 'input',
            immediate: false,
        }
       },
        
        computed: {
            errors() {
                return this.form.getErrors().list()
            }
        },
        methods: {
            input(current, was) {
                this.form.validate();
            },
            failed() {
                console.log('form errors: ', this.form.getErrors.all())
            },
            passed() {
                console.log('form passed: ', this.form.all());
            },
            submit() {
                return this.form.getErrors().any() ? this.failed() : this.passed();
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


### Validator Api


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
let rules = { pencil: 'not_within:notebook,pencil,2a,marker,sharpie,whiteboard' };

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


# Validator Error Api
> `Simplified Interaction With Rule Error Messages`

- [any()](#any-errors)
- [all()](#all-errors)
- [list()](#list-errors)
- [set(errors)](#set-errors)
- [forget()](#forget-errors)
- [has(field)](#has-error)
- [get(field)](#get-error)
- [list(field)](#list-error)
- [add(field, message)](#add-error)
- [set(field, messages)](#set-field-errors)
- [forget(field)](#forget-field)
- [getValidator()](#get-errors-validator)

### Validation Errors
> _Access validation errors bag object_
```js
let validation = validator(data, rules)

validation.validate();

validation.errors();
```



### Any Errors
> `Determine if there are "any" errors (bool)`
```js
validation.errors().any(); // true
```
```js
let data = { name: '' };
let rules = { name: 'required'};
let validation = validator(data, rules);

validation.validate();
validation.errors().any();
```



### All Errors
> `Retrieve all errors within the errors object`
```js
validation.errors().all()
/**
 * {
 *   name: ['name field is required' ],
 *   email: ['email must be an email', email field is required']
 *  }
 */
```
```js
let data = { name: '', email: '' };
let rules = { name: 'required', email: 'email|required' };
let validation = validator(data, rules).validate();

validation.errors().all();
```
```
{
    name: [
        'name field is required'
    ],
    email: [
        'email field must be an email address',
        'email field is required'
    ]
}
```



### List Errors
> `Retrieve all errors within the errors object`
```js
validation.errors().list()
// ['name field is required', 'email field is required', 'email field must be an email']
```
```js
let data = { name: '', email: '' };
let rules = { name: 'required', email: 'email|required' };
let validation = validator(data, rules);

validation.validate()
validation.errors().list();
```
```
[
    'name field is required',
    'email field must be an email address',
    'email field is required'
]
```



### Set Errors
> `Set all errors`
```js
validation.errors().set({
    name: ['this is an error message for name' ],
    something: ['has an error']
})
```
```js
let data = { name: '' };
let rules = { name: 'required' };
let validation = validator(data, rules);

validation.validate();
validation.errors().list(); // ['name is a required field']

validation.errors().set({
    notice: ['set this random error message']
});

validation.errors().list(); // ['set this random error message']
```



### Forget Errors
> `Forget errors and reset them to empty`
```js
validation.errors().forget()
```
```js
let data = { name: '' };
let rules = { name: 'required' };
let validation = validator(data, rules);

validation.validate();
validation.errors().list(); // ['name is a required field']

validation.errors().forget();
validation.errors().list() // []
```



### Has Error
> `Determine if a specific field has error messages`
```js
validator.errors().has('name') // true
validator.errors().has('email') // false
validator.errors().has('something_else') // false
```
```js
let data = { name: '', email: 'example@gmail.com' };
let rules = { name: 'required', email: 'email|required' };
let validation = validator(data, rules);

validation.validate();
validation.errors().has('name'); // true
validation.errors().has('email'); // false
validation.errors().has('something_else'); // false
```



### Get Error
> `Get _first_ error message for a specific field`
```js
validation.errors().get('name');
// "name is a required field"
```

```js
let data = { name: '' };
let rules = { name: 'required|min:3'};
let validation = validator(data, rules);

validation.validate();
validation.errors().get('name'); // 'name is a required field'
```


### List Error
> `List errors for a specific field`
```js
validation.errors().list('name');
// ["name is a required field", "name must be longer than 3 characters"]
```
```js
let data = { name: '' };
let rules = { name: 'required|min:3'};
let validation = validator(data, rules);

validation.validate();
validation.errors().list('name'); // ['name is a required field', 'name must be longer than 3 characters']
```


### Add Error
> `Add error message for a specific field`
```js
validation.errors().add('name', 'four failures in a row. Two more failures before your locked out');
```
```js
let data = { name: '' };
let rules = { name: 'required|min:3'};
let validation = validator(data, rules);

validation.validate();
validation.errors().add('name', 'four failures in a row. Two more failures before your locked out');
validation.errors().list('name');
// ['name is a required field', 'name must be longer than 3 characters', 'four failures in a row. Two more failures before your locked out']
```


### Set Error
> `Set error messages for a specific field`
```js
validation.errors().set('name', ['random messages', 'set on', 'the name field']);
```

```js
let data = { name: '' };
let rules = { name: 'required' };
let validation = validator(data, rules);

validation.validate();
validation.errors().list('name'); // ['name is a required field']

validation.errors().set('name', [
    'random messages', 'set on', 'the name field'
]);
validation.errors().list('name'); // ['random messages', 'set on', 'the name field']
```



### Forget Error
> `Forget error messages for a specific field`
```js
validation.errors().forget('name');
```

```js
let data = { name: '' };
let rules = { name: 'required' };
let validation = validator(data, rules).validate();

 // ['name is a required field']
validation.errors().list('name');

// Forget
validation.errors().forget('name');

// []
validation.errors().list('name');
```


# Validator Life Cycle Hooks

> `Hook into validation life cycle and add custom functionality`

## Available Life Cycle Hooks
- before
- passed
- failed
- after

_NOTE: The "After" hook runs prior to failed or passed_

## All Life Cycle Hooks
- May Register callbacks
- May Register more than one callback
- Forgets Registered callback after it's run
- Registered callbacks accept the validator instance

## Before Life Cycle Hook
> `Before validation rules are checked`

### Before Life Cycle Hook Example
```js

validator(data, rules).before(validation => {
    validation.extend({
        uppercase: [
            ':attribute mst be upper case',
            ({ value }) => value === value.toUpperCase()
        ]
    })
})
```

## After Life Cycle Example
> `After validation rules are checked`

### After Life Cycle Hook Example
```js
// Within vue instance, you can call another method
validator(data, rules).after(validation => {
    validation.errors.add('custom', 'Add Custom Error Message')
});
```

## Passed Life Cycle Hook
> `Runs when validation data passed validation rules`

### Passed Life Cycle Hook Example
```js
validator(data, rules).passed((validation) => {
    axios.post('/data', data).then(response => {
        window.location = '/home';
    })
    .catch(errors => console.error)
});
```

## Failed Life Cycle Hook
> `Runs when validation data failed validation rules`

### Failed Life Cycle Hook Example
```js

validator(data, rules).failed(validation => {
   console.log('error messages: ', validation.errors.all())
});
```


# Extending
> `extend several provided features of this package`

- Custom Error Messages
- Custom Validation Rule
- Custom Validation Rules

## Extending: Custom Error Messages
> `Customize rule error messages`

- Globally, each rule provides a default error message
- Easily override rule's default error message
- Simply pass 'messages' to our validator
- Only override messages you want to

```js bash
import validator from 'vuejs-validators';

let data = { name: '', email: '' };

let rules = {
    name: ['min:3', 'max:12', 'string', 'required'],
    email: ['email', 'required']
};

let messages = {
    'name.min': 'Whoops! :attribute is less than :min characters',
    'name.required': 'Wha oh, doesnt look like there any value for your :attribute field',

    'email.email': 'Really? Email is called Email...it has to be an email...',
};

let validation = validator(input, rules, messages)
```
## Extending: Custom Rules
> `Add Your Own Validation Rules`

- Easily add, or override, validation rules
- Add a group of rules at a time
- Add a single rule add a time

### Extending: Custom Rules ~ Add Single Rule
> `validator.extend(name, [message, rule])`
```js
validator(data, rules).extend('uppercase', [
    ':attribute must be uppercase',
    ({ value, validator, parameters }) => value === value.toUpperCase(),
]);
```

### Extending: Custom Rules ~ Add Multiple Rules
> `validator.extend({ first: [message, rule], second: [message, rule], etc... })`
```js
validation.extend({
    uppercase: [
       ':attribute must be uppercase',
        ({ value }) => value === value.toUpperCase(),
    ],
    not_uppercase: [
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

**TIP: console.log Rule Validation Context**
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

validator(form, rules, messages).validate();
```




### Contribute

PRs are welcomed to this project.
If you want to improve the vuejs-validators library, add
functionality or improve the docs please feel free to submit a PR.


### License

MIT © [Zachary Horton (Clean Code Studio)](https://github.com/zhorton34/vuejs-validators#README)
