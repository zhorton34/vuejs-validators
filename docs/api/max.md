## Max Rule

> The given field must not be more than the defined maximum limit


> `Passing Max Limit Rule`
```js
import validator from 'vuejs-validators';

let form = { password: 'secret' }
let rules = { password: 'max:10' }

validator(form, rules).validate();
```

> `Failing Max Limit Rule`
```js
import validator from 'vuejs-validator'

let form = { password: 'secret'}
let rules = { password: 'max:4' }

validator(form, rules).validate();
```


