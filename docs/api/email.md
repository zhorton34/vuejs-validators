# `email`

> The given field value must be an email

```js bash
import validator from 'vuejs-validators';

// Passes "email" rule
let form = { email: 'example@cleancode.studio' }
let rules = { email: ['email'] }
validator(form, rules).validate();

// Fails "email" Rule
let form = { email: 'asdfsdaf@.net'}
let rules = { email: ['email'] }
validator(form, rules).validate();
```
