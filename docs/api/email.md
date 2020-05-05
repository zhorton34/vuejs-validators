# `email`

> The given field value must be an email

### Passes
```js
import validator from 'vuejs-validators';

let form = { email: 'example@cleancode.studio' }
let rules = { email: ['email'] }

validator(form, rules).validate();
```

### Fails
```js
import validator from 'vuejs-validators';

let form = { email: 'asdfsdaf@.net'}
let rules = { email: ['email'] }

validator(form, rules).validate();
```
