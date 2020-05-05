## Email Rule

> The given field value must be an email

> `Passing Email Rule`
```js
import validator from 'vuejs-validators';

let form = { email: 'example@cleancode.studio' };
let rules = { email: ['email'] };

validator(form, rules).validate();
```

> `Failing Email Rule`
```js
import validator from 'vuejs-validators';

let form = { email: 'asdfsdaf@.net'}
let rules = { email: ['email'] }

validator(form, rules).validate();
```


