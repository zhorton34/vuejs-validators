## Array Rule

> The field under validation must be a JS array.

> `Passing Array Rule`
```js
import validator from 'vuejs-validators';

let form = { list: ['banana', 'broccoli', 'carrot'] };
let rules = { list: 'array' };

validator(form, rules).validate();
```

> `Failing Array Rule`
```js
import validator from 'vuejs-validators';

let form = { options: { name: 'hey world' } }
let rules = { options: 'array' }

validator(form, rules).validate();
```


