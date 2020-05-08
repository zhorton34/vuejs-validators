## Different Validation Rule

> The given field value is different than another field value

> `Passing Different Rule`
```js bash
import validator from 'vuejs-validators';

let form = { password: 'asdfasdfasdf', confirm_password: 'secret' };
let rules = { password: 'different:confirm_password' };

validator(form, rules).validate();
```

> `Failing Different Rule`
```js bash
import validator from 'vuejs-validators';

let form = { password: 'secret', confirm_password: 'secret' }
let rules = { password: 'different:confirm_password' }

validator(form, rules).validate();
```
