## Accepted Rule

> The field under validation must be yes, on, 1, or true. This is useful for validating "Terms of Service" acceptance.

> `Passing Accepted Rule`
```js
import validator from 'vuejs-validators';

let form = { terms_of_service: 'no' }
let rules = { terms_of_service: 'accepted' }

validator(form, rules).validate();
```

> `Failing Accepted Rule`
```js
import validator from 'vuejs-validators';

let form = { terms_of_service: null }
let rules = { terms_of_service: 'accepted' }

validator(form, rules).validate();
```


