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


