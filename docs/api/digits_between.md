## Digits Between Rule

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
```
