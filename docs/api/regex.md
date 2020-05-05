## Regex Rule

> The given field value must match the regular expression pattern

> `Passing Regex Rule`
```js
import validator from 'vuejs-validators';

let form = { email: 'example@gmail.com' };
let rules = { email: ['regex:/^.+@.+$/i'] };

validator(form, rules).validate();
```

> `Failing Regex Rule`
```js
import validator from 'vuejs-validators';

let form = { email: 'ex.-fn'}
let rules = { email: ['regex:/^.+@.+$/i'] }

validator(form, rules).validate();
```


