## Required Rule

> Validates that a given field exists and its value is set

> `Passing Required Rule`
```js
import validator from 'vuejs-validators';

let form = { name: 'jules' };
let rules = { name: ['required'] };

validator(form, rules).validate();
```

> `Failing Required Rule`
```js
import validator from 'vuejs-validators';

let form = {};
let rules = { name: ['required'] };

validator(form, rules).validate();
```


