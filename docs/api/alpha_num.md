## Alpha Num Rule

> The field under validation must be entirely alpha-numeric characters.

> `Passing Alpha Num Rule`

```js
import validator from 'vuejs-validators';

let form = { key: '4asdasdfe4d23545w634adf' };
let rules = { key: ['alpha_num'] };

validator(form, rules).validate();
```

> `Failing Alpha Num Rule`
```js
import validator from 'vuejs-validators';

let form = { identifier: '1-asdf4adf_d_42'}
let rules = { identifier: ['alpha_num'] }

validator(form, rules).validate();
```

