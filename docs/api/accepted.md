# `accepted`

> The field under validation must be yes, on, 1, or true. This is useful for validating "Terms of Service" acceptance.

```js bash
import validator from 'vuejs-validators';


const input = {
    terms_of_service: 'no'
};

const rules = {
   terms_of_service: 'accepted|required',
};

validator(input, rules);
```
[View source on GitHub](https://github.com/{user}/{repo}/blob/master/src/methods/example.js)
