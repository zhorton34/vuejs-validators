[![Travis](https://img.shields.io/travis/zhorton34/vuejs-validators/master.svg?style=flat-square)](https://travis-ci.org/zhorton34/vuejs-validators/builds)
[![npm downloads](https://img.shields.io/npm/dm/vuejs-validators.svg?style=flat-square)](http://badge.fury.io/js/vuejs-validators)
[![npm license](https://img.shields.io/npm/l/vuejs-validators.svg?style=flat-square)](http://badge.fury.io/js/vuejs-validators)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![dependencies](https://img.shields.io/badge/dependencies-none-brightgreen.svg?style=flat-square)](https://github.com/zhorton34/vuejs-validators/blob/master/package.json)
[![npm version](https://img.shields.io/npm/v/vuejs-validators.svg?style=flat-square)](http://badge.fury.io/js/vuejs-validators)


### Installation

#### NPM

```bash
npm install --save-dev vuejs-validators
```

#### Yarn

```bash
yarn add vuejs-validators --save
```


#### VueForm.js Recommended
- vuejs-validators.js can stand independently
- vuejs-form.js is a zero non-dev dependency package 
- This vuejs-validators.js package was built to support vuejs-form.js

## VueForm Playground Examples (Implementing Vuejs-validators.js)
- [Vue Example One (Live Example)](https://codepen.io/zhorton34/pen/zYvWZYz)
- [Vue Example Two (Live Example)](https://codepen.io/zhorton34/pen/xxwaYez)

## Vue Example One

> Show First Error For Each Field And
> 
> Only Validate Form (AKA find errors) when Form Data is submitted
```html
<template>
    <div>        
        <input type='text' v-model='form.name' />
        <span v-if="form.errors().has('name')" v-text="form.errors().get('email')"></span>

        <input type='email' v-model='form.email' />
        <span v-if="form.errors().has('email')" v-text="form.errors().get('email')"></span>

        <input type='password' v-model='form.password' />
        <span v-if="form.errors().has('password')" v-text="form.errors().get('password')"></span>

        <input type='password' v-model='form.password_confirmation' />
        <span v-if="form.errors().has('password_confirmation')" v-text="form.errors().get('password_confirmation')"></span>
 
        <hr>

        <button :disabled='form.empty()' @click='submit'>
            Complete
        </button>
    </div>
</template>
```
```js
import form from 'vuejs-form'

export default {
    data: () => ({
        form: form({
            email: '',
            password: '',
            password_confirmation: ''
        })
        .rules({
            email: 'email|min:5|required',
            password: 'required|min:5|confirmed'
        })
        .messages({
            'email.email': 'Email field must be an email (durr)',
            'password.confirmed': 'Whoops, :attribute value does not match :confirmed value',
        }),
   }),

    methods: {
        submit() {
            if (this.form.validate().errors().any()) return;

            console.log('submit: ', this.form.only('email', 'password'));
            console.log('submit: ', this.form.except('password_confirmation'));
        },
    }
}
```


## Vue Example Two

> Show all form errors for all form fields
>
> Re-validate Form Any time user updates form data for any field

```html
<template>
    <div>
        <div v-if="form.errors().any()" v-for="(message, key) in form.errors().list()" :key="`${key}.error`">
            {{ message }}
        </div>
        
        <input type='email' v-model='form.email' /> <br>
        <input type='password' v-model='form.password' /> <br>
        <input type='password' v-model='form.password_confirmation' /> <br>
        
        <hr>

        <button :disabled='form.empty()' @click='submit'>
            Complete
        </button>
    </div>
</template>
```
```js
import form from 'vuejs-form'

export default {
    data: () => ({
        form: form({
            email: '',
            password: '',
            password_confirmation: ''
        })
        .rules({
            email: 'email|min:5|required',
            password: 'required|min:5|confirmed'
        })
        .messages({
            'email.email': ':attribute must be a valid email',
            'email.min': ':attribute may not have less than :min characters',
            'password.confirmed': 'Whoops, :attribute value does not match :confirmed value',
        }),
   }),

   watch: {
       /*--------------------------------------------------------------
        | When Should Your Form "Validate", Providing Error Messages?
        |--------------------------------------------------------------
        | 
        |   Form validates every time form data is updated. To
        |   display errors on form submit, remove watcher &
        |   move "this.form.validate()" over to submit()
        |
        */

        ['form.data']: {
            deep: true,
            immediate: false,
            handler: 'onFormChange'
        }
   },

    methods: {
        onFormChange(after, before) {
             this.form.validate()
        },
       
        submit() {
            return this.form.errors().any() ? this.failed() : this.passed();
        },

        failed() {
            console.log('errors: ', this.form.errors().all());
        },

        passed() {
            console.log('data: ', this.form.all());
            console.log('wrapped data: ', this.form.wrap('data'));
        }
    }
}
```


### VueJS Form & VueJS Validators Together (Recommended for best development experience, but ultimately optional)
- [(npm)](https://www.npmjs.com/package/vuejs-form)
- [(github)](https://github.com/zhorton34/vuejs-form)
- _Fast_ Setup
- _Zero_ Dependencies
- _Tested_ Thoroughly
- _Simplified_ Syntax
- _Extremely_ Lightweight
- _Simplified_ Extendability
_Did You Know? Individually, each package has ZERO Non-Dev Dependencies & can be used independently, but ultimately were built in parallel with each other._

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
import validatable from 'vuejs-validators'

export default {
    data: () => ({
        form: form(validatable, {
            email: '', password: '', confirm_password: ''
        })
        .rules({
            email: 'email|min:5|required',
            password: 'same:confirm_password',
            confirm_password: 'min:6|required',
        })
        .messages({
            'password.same': 'Whoops, :attribute does not match the :same field',
        }),
   }),

   computed: {
       errors() {
            return this.form.getErrors().list();
        },
   },

   watch: {
       /*--------------------------------------------------------------
        * When Should Your Form "Validate", Providing Error Messages?
        *--------------------------------------------------------------
        * Form validates every time form data is updated. To
        * display errors on form submit, remove watcher &
        * move "this.form.validate()" over to submit()
        *--------------------------------------------------------------
        */
        ['form.data']: {
            deep: true,
            handler(data, old) {
                this.form.validate();
            },
        }
   },


    methods: {
        submit() {
            return this.form.getErrors().any() ? this.failed() : this.passed();
        },
        failed() {
            console.log('failed: ', this.form.getErrors().all());
        },
        passed() {
            console.log('passed: ', this.form.all());
        },
    }
}
</script>
```


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


### Validator Api


- [accepted](#accepted-rule)
- [after](#after-rule)
- [after_or_equal](#after_or_equal-rule)
- [alpha](#alpha-rule)
- [alpha_dash](#alpha_dash-rule)
- [alpha_num](#alpha_num-rule)
- [array](#array-rule)
- [before](#before-rule)
- [before_or_equal](#before_or_equal-rule)
- [between](#between-rule)
- [boolean](#boolean-rule)
- [confirmed](#confirmed-rule)
- [date](#date-rule)
- [date_equals](#date_equals-rule)
- [different](#different-rule)
- [digits](#digits-rule)
- [digits_between](#digits_between-rule)
- [distinct](#distinct-rule)
- [email](#email-rule)
- [ends_with](#ends_with-rule)
- [greater_than](#greater_than-rule)
- [gte](#gte-rule)
- [integer](#integer-rule)
- [ip](#ip-rule)
- [ipv4](#ipv4-rule)
- [ipv6](#ipv6-rule)
- [json](#json-rule)
- [less_than](#less_than-rule)
- [lte](#lte-rule)
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
- [starts_with](#starts_with-rule)
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


### After Rule
(Date)

The Field under evaluation must be after the compared date

> Passes After (Date) Rule
```js
let form = { 
    one: '4-22-1997', 
    two: '2-2-1997' 
}

let rules = {
  one: 'after:4-23-1997',
  two: 'after:2-3-1996',
}
```

> Fails After (Date) Rule
```js
let form = { 
    one: '4-22-1997', 
    two: '2-12-1997' 
}

let rules = {
  one: 'after:4-22-1998',
  two: 'after:1-11-1996',
}

### After Or Equal Rule
(Date)
The field under validation must be after or equal to the compared date.

> Passes After Or Equal (Date) Rule
```js
let form = { 
    one: '4-22-1997',
    two: '1-11-2013', 
}

let rules = {
  one: 'after_or_equal:4-22-1997',
  two: 'after_or_equal:2-12-2014',
}
```

> Fails After Or Equal (Date) Rule
```js
let form = { 
    one: '4-22-1997',
    two: '2-12-1997' 
}

let rules = {
  one: 'after_or_equal:4-23-1997',
  two: 'after_or_equal:2-3-1996',
}

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


### Before Rule
(Date)

The Field under evaluation must be before the compared date

> Passes Before (Date) Rule
```
let form = { 
    one: '4-22-1997', 
    two: '2-12-1997' 
}

let rules = {
  one: 'before:4-22-1998',
  two: 'before:2-12-1997',
}
```

> Fails Before (Date) Rule
```
let form = { 
    one: '4-22-1997', 
    two: '3-12-1997' 
}

let rules = {
  one: 'before:4-22-1997',
  two: 'before:2-3-1996',
}

### Before Or Equal Rule
(Date)
The field under validation must be before or equal to the compared date.

> Passes Before Or Equal (Date) Rule
```
let form = { 
    one: '4-22-1997', 
    two: '2-12-1997' 
}

let rules = {
  one: 'before_or_equal:3-21-1998',
  two: 'before_or_equal:2-12-1997',
}
```

> Fails Before Or Equal (Date) Rule
```
let form = { 
    one: '4-22-1997', 
    two: '2-3-1997' 
}

let rules = {
  one: 'before_or_equal:4-23-1997',
  two: 'before_or_equal:2-3-1996',
}

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


### Confirmed Validation Rule

> The field under validation must have a matching field of foo_confirmation. For example, if the field under validation is password, a matching password_confirmation field must be present in the input.

> `Passing Confirmed Rule`
```js bash
import validator from 'vuejs-validators';

let form = { password: 'secret', password_confirmation: 'secret' }
let rules = { password: 'confirmed' }

validator(form, rules).validate();
```

> `Failing Confirmed Rule`
```js bash
import validator from 'vuejs-validators';

// Rule Fails When No {attribute}_confirmation field exists
let form = { password: 'secret' };
let rules = { password: 'confirmed' };

validator(form, rules).validate();

// Rule Fails When {attribute} value does not match {attribute}_confirmation value
let form = { password: 'secret', password_confirmation: 'not_secret' };
let rules = { password: 'confirmed' };

validator(form, rules).validate();
```


### Date Rule
(Date)
The field under validation must be a valid, non-relative date according to the new Date js constructor.

> Passes Date Rule
- 4.22.1997 
- 4-22-1997
- 4/22/1997
- April 22 1997
- Tuesday April 22 1997

> Fails Date Rule
- asdfweadf
- 23423423
- []

### Date Equals Rule
(Date)
The field under validation must be the same date as the rules date

> Passes Date Equals Rule
```js
let form = { 
    one: '4-22-1997',
    two: 'April 22 2025' 
}

let rules = {
  one: 'date_equals:4-22-1997',
  two: 'date_equals:April 22 2025',
}
```

> Fails Date Equals Rule
```js
let form = { 
    one: '4-22-1997',
    two: '2-12-1997' 
}

let rules = {
  one: 'date_equals:4-24-1998',
  two: 'date_equals:1-11-1996',
}

### Different Validation Rule

> The given field value is different than another field value

> `Passing Different Rule`
```js bash
import validator from 'vuejs-validators';

let form = { password: 'asdfasdfasdf', confirm_password: 'secret' };
let rules = { password: 'different:confirm_password' };

validator(form, rules).validate();
```

> `Failing Different Rule`
```js bash
import validator from 'vuejs-validators';

let form = { password: 'secret', confirm_password: 'secret' }
let rules = { password: 'different:confirm_password' }

validator(form, rules).validate();

### Digits Rule

> The field under validation must be numeric and must have an exact length of value.

> `Passing Digits Rule`
```js
import validator from 'vuejs-validators';

let form = { amount: '10000' }
let rules = { amount: 'digits:6' }

validator(form, rules).validate();
```

> `Failing Digits Rule`
```js
import validator from 'vuejs-validator'

let form = { amount: '10000' }
let rules = { amount: 'digits:4' }

validator(form, rules).validate();

### Digits Between Rule

> The field under validation must be numeric and have a length between the lower and upper limit defined.

> `Passing Digits Between Rule`
```js
import validator from 'vuejs-validators';

let form = { amount: '10000' }
let rules = { amount: 'digits_between:4,6' }

validator(form, rules).validate();
```

> `Failing Digits Rule`
```js
import validator from 'vuejs-validator'

let form = { amount: '10000' }
let rules = { amount: 'digits_between:3,5' }

validator(form, rules).validate();

### Distinct Rule

> The field under validation must be an array with no duplicate values.

> `Passing Distinct Rule`
```js
import validator from 'vuejs-validators';

let form = { shopping_list: ['ham', 'eggs', 'milk', 'turkey'] }
let rules = { shopping_list: 'distinct' }

validator(form, rules).validate();
```

> `Failing Digits Rule`
```js
import validator from 'vuejs-validator'

let form = { shopping_list: ['ham', 'ham', 'eggs', 'milk', 'turkey'] }
let rules = { shopping_list: 'distinct' }

validator(form, rules).validate();

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


### Ends With Rule

> The field under validation must end with one of the given values.

> `Passing Ends With Rule`
```js
import validator from 'vuejs-validators';

let form = { name: 'sammie' };
let rules = { name: 'ends_with:sl,ie,asx' };

validator(form, rules).validate();
```

> `Failing String Rule`
```js
import validator from 'vuejs-validators';

let form = { name: 5 };
let rules = { name: 'ends_with:sl,ie,asx' };

validator(form, rules).validate();

let form = { name: 'azure' };
let rules = { name: 'ends_with:sl,ie,asx' };

validator(form, rules).validate();
```


### Greater Than Rule
(Numeric)

Number must be greater than compared value

> Passing greater than rule
```js

let form = {
    age: 24,
    members: 19,
    percentage: 0.4,
};

let rules = {
    age: 'greater_than:13',
    members: 'greater_than:10',
    percentage: 'greater_than:0.35',
};
```

> Failing greater than rule
```js
 let form = {
     age: 24,
     members: 19,
     percentage: 0.4,
 };
 
 let rules = {
     age: 'greater_than:24',
     members: 'greater_than:100',
     percentage: 'greater_than:0.9',
 };

### Gte Rule
(Greater Than Or Equal - Numeric)
Number must be greater than or equal to compared value

> Passing greater than or equal rule (gte)
```js

let form = {
    age: 24,
    members: 19,
    percentage: 0.4,
};

let rules = {
    age: 'gte:24',
    members: 'gte:10',
    percentage: 'gte:0.35',
};
```

> Failing greater than or equal rule (gte)
```js
 
 let form = {
     age: 24,
     members: 19,
     percentage: 0.4,
 };
 
 let rules = {
     age: 'greater_than:25',
     members: 'greater_than:100',
     percentage: 'greater_than:0.9',
 };

### Integer Rule

> This validation rule does not verify that the input is of the "integer" variable type, only that the input is a string or numeric value that contains an integer.

> `Passing Integer Rule`
```js
import validator from 'vuejs-validators';

let form = { students: 25 }
let rules = { students: ['integer'] }

validator(form, rules).validate();
```

> `Failing Integer Rule`
```js
import validator from 'vuejs-validators';

let form = { students: 'yes' }
let rules = { students: ['integer'] }

validator(form, rules).validate();
```


### IP Rule

> This validation rule confirms that value is an IP address.

> `Passing IP Rule`
- "115.42.150.37"
- "192.168.0.1"
- "110.234.52.124"
- "2001:0db8:85a3:0000:0000:8a2e:0370:7334" (Ipv6)

> `Failing IP Rule`
- "210.110" – must have 4 octets
- "255" – must have 4 octets
- "y.y.y.y" – the only digit has allowed
- "255.0.0.y" – the only digit has allowed
- "666.10.10.20" – digit must between [0-255]
- "4444.11.11.11" – digit must between [0-255]
- "33.3333.33.3" – digit must between [0-255]


### IPv4 Rule

> This validation rule confirms that value is an IPv4 address.

> `Passing IPv4 Rule`
- "115.42.150.37"
- "192.168.0.1"
- "110.234.52.124"

> `Failing IPv4 Rule`
- "210.110" – must have 4 octets
- "255" – must have 4 octets
- "y.y.y.y" – the only digit has allowed
- "255.0.0.y" – the only digit has allowed
- "666.10.10.20" – digit must between [0-255]
- "4444.11.11.11" – digit must between [0-255]
- "33.3333.33.3" – digit must between [0-255]
- "2001:0db8:85a3:0000:0000:8a2e:0370:7334" (Ipv6)


### IPv6 Rule

> This validation rule confirms that value is an IPv6 address.

> `Passing IPv6 Rule`
- "2001:0db8:85a3:0000:0000:8a2e:0370:7334" (Ipv6)

> `Failing IPv6 Rule`
- "210.110" – must have 4 octets
- "255" – must have 4 octets
- "y.y.y.y" – the only digit has allowed
- "255.0.0.y" – the only digit has allowed
- "666.10.10.20" – digit must between [0-255]
- "4444.11.11.11" – digit must between [0-255]
- "33.3333.33.3" – digit must between [0-255]
- "110.234.52.124"
- "192.168.0.1"
- "115.42.150.37"


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

### Less Than Rule
(Numeric)

Number must be less than compared value

> Passing less than rule
```js

let form = {
    age: 24,
    members: 19,
    percentage: 0.4,
} ;

let rules = {
    age: 'less_than:25',
    members: 'less_than:20',
    percentage: 'less_than:0.8',
}
```

> Failing less than rule
```js
 let form = {
     age: 24,
     members: 19,
     percentage: 0.4,
 };
 
 let rules = {
     age: 'less_than:24',
     members: 'less_than:10',
     percentage: 'less_than:0.1',
 }

### Lte Rule
(Less than or equal - Numeric)

Number must be less than or equal to compared value

> Passing Less than or equal (lte) rule
```js

let form = {
    age: 24,
    members: 19,
    percentage: 0.4,
} ;

let rules = {
    age: 'lte:24',
    members: 'lte:20',
    percentage: 'lte:0.8',
}
```

> Failing less than or equal (lte) rule
```js
 let form = {
     age: 24,
     members: 19,
     percentage: 0.4,
 };
 
 let rules = {
     age: 'less_than:24',
     members: 'less_than:10',
     percentage: 'less_than:0.5',
 }

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


### Starts With Rule

> The field under validation must start with one of the given values.

> `Passing Starts With Rule`
```js
import validator from 'vuejs-validators';

let form = { name: 'sammie' };
let rules = { name: 'starts_with:joe,sam,tom' };

validator(form, rules).validate();
```

> `Failing Starts With Rule`
```js
import validator from 'vuejs-validators';

let form = { name: 5 };
let rules = { name: 'starts_with:sl,ie,asx' };

validator(form, rules).validate();

let form = { name: 'azure' };
let rules = { name: 'starts_with:joe, sam, tom' };

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


- [add](#add)
- [all](#all)
- [any](#any)
- [forceMacro](#forcemacro)
- [forget](#forget)
- [get](#get)
- [has](#has)
- [list](#list)
- [macro](#macro)
- [set](#set)

## Add

```js
errors().add('company', 'Your company is important to us, add the proper information so others can learn about it to!'); 
```

``` 
# errors.list('company')

[
   'Company field is required',
   'Company field must have no more than 15 characters',
   'Your company is important to us, add the proper information so others can learn about it to!'
]
```



## All
Return "all" error messages as object of fields with list of their error messages  

```js 
errors().all(); 
```

``` 
{
    name: ['Name field is required', 'Name field must have at lest 3 characters'],
    email: ['Email field must be an email', 'Email field must have at least 3 characters']
}
```



## Any
Determine if there are currently "any" error messages within error bag 

```js
errors().any(); 
```

``` 
true: If there are any error messages
false: If there are NOT any error messages
```



## Force Macro
Force macro acts the same as macro, with the option to forcefully override core functions and already existing macros.
(Use with caution).

_Note See forceLocalMacro to only apply the method on a specific instance instead of globally on the prototype constructor_

```js
errors().get('name'); 
// Output: 'Name field is required'

errors().forceMacro('get', function (field) {
    return this.list(field).join(', ');
});

errors().get('name'); 
// Output: 'Name field is required, Name field can not be greater than 3 characters, Name field must be a string'
```


## Forget
Forget error messages on all fields or optionally on a specific field

```js
errors.forget(); // Forget errors messages for all fields

errors.forget('name'); // only forget the error messages for a specific field
```


## Get
Get first available error message on a given field

```js
errors.get('name');
```


## Has
Check if a specific field "has" error messages 

```js
errors.has('name');
```


## List
List all error messages or optionally list all array messages for a specific field 

```js
errors.list(); // ['Name is a required field']

errors.list('name'); // ['Name is a required field']
errors.list('email'); // ['Email field must be an email', 'Email is a required field']
```


## Macro
Extend errors message bag instance using macros
_Note See localMacro to only apply the method on a specific instance instead of globally on the prototype constructor_

```js
errors().macro('count', function () {
    return this.list().length();
});

// errors().count() === errors().list().count();
```


## Set
Set all error messages, or optionally set given fields error messages
 
```js
// Set all fields error messages
errors().set({
    name: ['Name field is off, check it out and try again', 'Name field is in wrong language'],
    formula: ['Formula is not incorrect according to the laws of physics']
});

// Set specific field error messages
errors().set('name', ['Name field is off, check it out and try again', 'Name field is in wrong language']);
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


## Change Log

---

### 1.1.7

---
- date rule
- date equals rule
- before (date) rule
- before_or_equal (date) rule
- after (date) rule
- after_or_equal (date) rule
- less_than (numeric) rule
- greater_than (numeric) rule
- lte (less than or equal numeric) rule
- gte (greater than or equal numeric) rule
---

---

### 1.1.6

---
- macro, localMacro, forceMacro, and forceLocalMacro methods added on validators and Error Messages Api
- macro, localMacro, forceMacro, and forceLocalMacro methods testing added with associated docs in vueform-js repo
---

### Release 1.1.5

---
- Error messages "forceMacro" method (Override core functions)
- Error messages documentation refactored according to updates
- "passing" method, returns a success message bag, but it is not officially documented nor officially supported as of yet.
- MessageBag & MessageBagFactory (Error messages api is an implementation of the message bag prototype) are exported and optional imports

---

### Release 1.1.4

---
- Changes to adapt package to vuejs-form implementation


---

### Release 1.1.3

---
- Added ip rule
- Added ipv4 rule
- Added ipv6 rule
