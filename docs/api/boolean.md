# `boolean`

- Boolish validation, not strict boolean check
- Validates that field value is _"truthy"_ or _"falsy"_

> _Accepted "Falsy" values_
``` js
let falsy = [
    0, '0',
    'no', 'No', 'NO',
    'off', 'Off', 'OFF',
    false, 'false', 'False', 'FALSE',
];
```

> _Accepted "Truthy" values_
``` js
let truthy = [
    1, '1',
    'on', 'On', 'ON',
    'yes', 'Yes', 'YES',
    true, 'true', 'True', 'TRUE',
];
```

```js bash
import validator from 'vuejs-validators';

// Passes Boolean Rule
let form = { selected: 'Yes' }
let rules = { selected: ['boolean'] }
validator(form, rules).validate();

// Fails Boolean Rule
form = { selected: null };
rules = { selected: ['boolean'] }
validator(form, rules).validate()
```
