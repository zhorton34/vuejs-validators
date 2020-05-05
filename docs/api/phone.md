# `phone`

> The given field value must be a phone number

```js bash
import validator from 'vuejs-validators';

// Passes "phone" rule
let form = { send_sms: ['555-555-5555'] }
let rules = { send_sms: ['phone'] }
validator(form, rules).validate();

// Fails "phone" Rule
let form = { send_sms: '+(3) - 4 32'}
let rules = { send_sms: ['phone'] }
validator(form, rules).validate();
```

### Phone number formats this projects currently has tests for
(Any contributions welcome for improving regex validation patterns for current rules as well as adding new rules)
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
