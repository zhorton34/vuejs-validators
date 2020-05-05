## Json Rule

> The given field value must be a Json String

> `Passing Json Rule`
```js
import validator from 'vuejs-validators';

let form = { content: JSON.stringify({ inspire: 'love' }) };
let rules = { content: 'json' };

validator(form, rules).validate();
```

> `Failing Json Rule`
```js
import validator from 'vuejs-validators';

let form = { content: 'fasdf' }
let rules = { content: 'json' }

validator(form, rules).validate();
```
