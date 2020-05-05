## Boolean Rule

> Boolish validation, not strict boolean check
> Validates that field value is "truthy" or "falsy"

> `Falsy Values`
```js
let falsy = [
    0, '0',
    'no', 'No', 'NO',
    'off', 'Off', 'OFF',
    false, 'false', 'False', 'FALSE',
];
```

> `Truthy values`
```js
let truthy = [
    1, '1',
    'on', 'On', 'ON',
    'yes', 'Yes', 'YES',
    true, 'true', 'True', 'TRUE',
];
```

> `Passing Boolean Rule`
```js
import validator from 'vuejs-validators';

let form = { selected: 'Yes' };
let rules = { selected: ['boolean'] };

validator(form, rules).validate();
```

> `Failing Boolean Rule`
```js
import validator from 'vuejs-validators';

form = { selected: null };
rules = { selected: ['boolean'] };

validator(form, rules).validate();
```


