# `same`

> The given field value is the same as another field value

```js bash
import validator from 'vuejs-validators';

// Passes "Same" Validation Rule
let form = { password: 'secret', confirm_password: 'secret' }
let rules = { password: 'same:confirm_password' }
validator(form, rules).validate();

// Fails "Same" Validation Rule
let form = { password: 'asdfasdfasdf', confirm_password: 'secret' }
let rules = { password: 'same:confirm_password' }
validator(form, rules).validate();
```
