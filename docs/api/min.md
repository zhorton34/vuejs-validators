# `min:{limit}`

> The given field must not be less than the defined minimum limit

```js bash
import validator from 'vuejs-validators';

// Passes "min:{limit}" rule
let form = { name: 'Johnny' }
let rules = { name: 'min:6' }
validator(form, rules).validate();

// Fails "min:{limit}" Rule
let form = { name: 'jake'}
let rules = { name: 'min:5' }
validator(form, rules).validate();
```
