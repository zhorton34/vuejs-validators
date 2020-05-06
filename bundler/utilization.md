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


