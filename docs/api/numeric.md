## Numeric Rule

> Determine if a value is numeric, or is a string that can properly represent a numeric

- Numerical value, not strict number check
- Automatically attempts to cast value to numerical value.
- Validates that field value an integer, decimal, or bigInt.

> `Passing Numeric Rule`
```js
import validator from 'vuejs-validators';

let form = { members: '25' }
let rules = { member: ['numeric'] }

validator(form, rules).validate();
```

> `Failing Numeric Rule`
```js
import validator from 'vuejs-validators';

let form = { members: 'yes' }
let rules = { member: ['numeric'] }

validator(form, rules).validate();
```


