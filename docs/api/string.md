## String Rule

> The given field value must be a String

> `Passing String Rule`
```js
import validator from 'vuejs-validators';

let form = { name: 'sammie' };
let rules = { name: 'string' };

validator(form, rules).validate();
```

> `Failing String Rule`
```js
import validator from 'vuejs-validators';

let form = { name: 54345  }
let rules = { name: 'string' }

validator(form, rules).validate();
```


