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
validation.errors().list('name'); // ['name is a required field', 'name must be longer than 3 characters']
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
let validation = validator(data, rules);

validation.validate();
validation.errors().list('name'); // ['name is a required field']
validation.errors().forget('name');

validation.errors().list('name'); // []
```
