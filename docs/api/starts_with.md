## Starts With Rule

> The field under validation must start with one of the given values.

> `Passing Starts With Rule`
```js
import validator from 'vuejs-validators';

let form = { name: 'sammie' };
let rules = { name: 'starts_with:joe,sam,tom' };

validator(form, rules).validate();
```

> `Failing Starts With Rule`
```js
import validator from 'vuejs-validators';

let form = { name: 5 };
let rules = { name: 'starts_with:sl,ie,asx' };

validator(form, rules).validate();

let form = { name: 'azure' };
let rules = { name: 'starts_with:joe, sam, tom' };

validator(form, rules).validate();
```


