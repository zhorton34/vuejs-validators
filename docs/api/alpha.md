## Alpha Rule

> The field under validation must be entirely alphabetic characters.

> `Passing Alpha Rule`
```js
import validator from 'vuejs-validators';

let form = { letters: 'asdeddadfjkkdjfasdf' };
let rules = { letters: ['alpha'] };

validator(form, rules).validate();
```

> `Failing Alpha Rule`
```js
import validator from 'vuejs-validators';

let form = { letters: '5-@'}
let rules = { letters: ['alpha'] }

validator(form, rules).validate();
```


