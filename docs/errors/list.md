# List
List all error messages or optionally list all array messages for a specific field 

```js
errors.list(); // ['Name is a required field']

errors.list('name'); // ['Name is a required field']
errors.list('email'); // ['Email field must be an email', 'Email is a required field']
```

[View source on GitHub](https://github.com/zhorton34/vuejs-validators/blob/master/src/messages/list.js)
