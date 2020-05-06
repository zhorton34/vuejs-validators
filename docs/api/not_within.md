## Not Within Rule

> The given field must NOT be "within" the comma delimited list of items

> `Passing Not Within Rule`
```js bash
import validator from 'vuejs-validators';

let form = { language: 'PigLatin' }
let rules = { language: 'not_within:German,Spanish,English,Latin' }

validator(form, rules).validate();
```

> `Failing Not Within Rule`
```js
import validator from 'vuejs-validators';

let form = { pencil: '2a'};
let rules = { pencil: 'not_within:notebook,pencil,2a,marker,sharpie,whiteboard' };

validator(form, rules).validate();
```


