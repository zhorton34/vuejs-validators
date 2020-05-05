## Alpha Dash Rule

> The field under validation may have alpha-numeric characters, as well as dashes and underscores.

> `Passing Alpha Dash Rule`

```js
import validator from 'vuejs-validators';

let form = { slug: 'user_name' };
let rules = { slug: ['alpha_dash'] };

validator(form, rules).validate();
```

> `Failing Alpha Dash Rule`
```js
import validator from 'vuejs-validators';

let form = { words: 'hello world'}
let rules = { words: ['alpha_dash'] }

validator(form, rules).validate();
```

