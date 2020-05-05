## Min Rule

> The given field must not be less than the defined minimum limit

> `Passing Min Limit Rule`
```js
import validator from 'vuejs-validators';

let form = { password: 'secret' }
let rules = { password: 'min:6' }

validator(form, rules).validate();
```

> `Failing Min Limit Rule`
```js
import validator from 'vuejs-validator'

let form = { password: 'secret'}
let rules = { password: 'min:8' }

validator(form, rules).validate();
```


