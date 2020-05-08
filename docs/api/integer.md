## Integer Rule

> This validation rule does not verify that the input is of the "integer" variable type, only that the input is a string or numeric value that contains an integer.

> `Passing Integer Rule`
```js
import validator from 'vuejs-validators';

let form = { students: 25 }
let rules = { students: ['integer'] }

validator(form, rules).validate();
```

> `Failing Integer Rule`
```js
import validator from 'vuejs-validators';

let form = { students: 'yes' }
let rules = { students: ['integer'] }

validator(form, rules).validate();
```


