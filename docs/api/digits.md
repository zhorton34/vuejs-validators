## Digits Rule

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
```
