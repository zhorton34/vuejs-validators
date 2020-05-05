# `max:{limit}`

> The given field must not be more than the defined maximum limit

```js bash
import validator from 'vuejs-validators';

// Passes "max:{limit}" rule
let form = { password: 'secret' }
let rules = { password: 'max:10' }
validator(form, rules).validate();

// Fails "max:{limit}" Rule
let form = { password: 'secret'}
let rules = { password: 'max:4' }
validator(form, rules).validate();
```
