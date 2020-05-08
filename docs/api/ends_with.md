## Ends With Rule

> The field under validation must end with one of the given values.

> `Passing Ends With Rule`
```js
import validator from 'vuejs-validators';

let form = { name: 'sammie' };
let rules = { name: 'ends_with:sl,ie,asx' };

validator(form, rules).validate();
```

> `Failing String Rule`
```js
import validator from 'vuejs-validators';

let form = { name: 5 };
let rules = { name: 'ends_with:sl,ie,asx' };

validator(form, rules).validate();

let form = { name: 'azure' };
let rules = { name: 'ends_with:sl,ie,asx' };

validator(form, rules).validate();
```


