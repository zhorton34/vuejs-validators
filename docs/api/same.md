## Same Validation Rule

> The given field value is the same as another field value

> `Passing Same Rule`
```js bash
import validator from 'vuejs-validators';

let form = { password: 'secret', confirm_password: 'secret' }
let rules = { password: 'same:confirm_password' }

validator(form, rules).validate();
```

> `Failing Same Rule`
```js bash
import validator from 'vuejs-validators';

let form = { password: 'asdfasdfasdf', confirm_password: 'secret' };
let rules = { password: 'same:confirm_password' };

validator(form, rules).validate();
```


