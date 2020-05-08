## Confirmed Validation Rule

> The field under validation must have a matching field of foo_confirmation. For example, if the field under validation is password, a matching password_confirmation field must be present in the input.

> `Passing Confirmed Rule`
```js bash
import validator from 'vuejs-validators';

let form = { password: 'secret', password_confirmation: 'secret' }
let rules = { password: 'confirmed' }

validator(form, rules).validate();
```

> `Failing Confirmed Rule`
```js bash
import validator from 'vuejs-validators';

// Rule Fails When No {attribute}_confirmation field exists
let form = { password: 'secret' };
let rules = { password: 'confirmed' };

validator(form, rules).validate();

// Rule Fails When {attribute} value does not match {attribute}_confirmation value
let form = { password: 'secret', password_confirmation: 'not_secret' };
let rules = { password: 'confirmed' };

validator(form, rules).validate();
```


