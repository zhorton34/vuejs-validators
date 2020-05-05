## Within Rule

> The given field must be "within" the comma delimited list of items

> `Passing Within Rule`
```js bash
import validator from 'vuejs-validators';

let form = { name: 'Sam' }
let rules = { name: 'within:James,Boronica,Sam,Steve,Lenny' }

validator(form, rules).validate();
```

> `Failing Within Rule`
```js
import validator from 'vuejs-validators';

let form = { name: 'jake'};
let rules = { name: 'within:patricia,veronica,samuel,jeviah' };

validator(form, rules).validate();
```


