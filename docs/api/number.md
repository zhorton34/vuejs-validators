## Number Rule

> The given field must be a Number (Strict Typed Check). See Numeric For Looser Type Checking

> `Passing Number Rule`
```js
import validator from 'vuejs-validators';

let form = { id: 15 };
let rules = { id: ['number'] };

validator(form, rules).validate();
```

> `Failing Number Rule`
```js
import validator from 'vuejs-validators';

let form = { id: '15'}
let rules = { id: ['number'] }

validator(form, rules).validate();
```


