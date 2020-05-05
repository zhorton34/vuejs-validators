## Phone Rule

> The given field value must be a phone number

> `Passing Phone Rule`
```js
import validator from 'vuejs-validators';

let form = { send_sms: ['555-555-5555'] }
let rules = { send_sms: ['phone'] }
validator(form, rules).validate();
```

> `Failing Phone Rule`
```js
import validator from 'vuejs-validators';

let form = { send_sms: '+(3) - 4 32'}
let rules = { send_sms: ['phone'] }

validator(form, rules).validate();
```

> `Phone Number Formats Within Testing Coverage`
- +61 1 2345 6789
- +61 01 2345 6789
- 01 2345 6789
- 01-2345-6789
- (01) 2345 6789
- (01) 2345-6789
- 5555555555
- (555) 555 5555
- 555 555 5555
- +15555555555
- 555-555-5555

> _(Any contributions welcome for improving regex validation patterns for current rules as well as adding new rules)_


