# Set
Set all error messages, or optionally set given fields error messages
 
```js
// Set all fields error messages
errors().set({
    name: ['Name field is off, check it out and try again', 'Name field is in wrong language'],
    formula: ['Formula is not incorrect according to the laws of physics']
});

// Set specific field error messages
errors().set('name', ['Name field is off, check it out and try again', 'Name field is in wrong language']);
```

[View source on GitHub](https://github.com/zhorton34/vuejs-validators/blob/master/src/errors/set.js)
