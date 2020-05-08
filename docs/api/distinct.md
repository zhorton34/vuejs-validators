## Distinct Rule

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
```
