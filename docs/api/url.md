## Url Rule

> The given field value must be an http(s) url

> `Passing Url Rule`
```js
import validator from 'vuejs-validators';

let form = { link: 'https://cleancode.studio' };
let rules = { link: 'url' };

validator(form, rules).validate();
```

> `Failing Url Rule`
```js
import validator from 'vuejs-validators';

let form = { link: 'httP/ope_type@.net'}
let rules = { link: 'url' }

validator(form, rules).validate();
```


