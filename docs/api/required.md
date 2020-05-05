# `required`

> The field is required

```js bash
import validator from 'vuejs-validators';

let form = { name: '' }
let rules = { name: ['required'] }

validator(form, rules).validate();
```
