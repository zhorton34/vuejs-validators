# `within:{one},{two},{three},{four}`

> The given field must be "within" the comma delimited list of items

```js bash
import validator from 'vuejs-validators';

// Passes "within:{one},{two},etc..." rule
let form = { name: 'Sam' }
let rules = { name: 'within:James,Boronica,Sam,Steve,Lenny' }
validator(form, rules).validate();

// Fails "within:{one},{two},etc..." rule
let form = { name: 'jake'}
let rules = { name: 'within:patricia,veronica,samuel,jeviah' }
validator(form, rules).validate();
```
