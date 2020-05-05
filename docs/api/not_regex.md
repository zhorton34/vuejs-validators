## Not Regex Rule

> The given field value must NOT match the regular expression pattern

> `Passing Not Regex Rule`
```js
import validator from 'vuejs-validators';

let form = { email: 'ex.-fn' };
let rules = { email: ['regex:/^.+@.+$/i'] };

validator(form, rules).validate();
```

> `Failing Not Regex Rule`
```js
import validator from 'vuejs-validators';

let form = { email: 'example@gmail.com'}
let rules = { email: ['regex:/^.+@.+$/i'] }

validator(form, rules).validate();
```


