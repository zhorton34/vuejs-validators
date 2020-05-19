# Force Macro
Force macro acts the same as macro, with the option to forcefully override core functions and already existing macros.
(Use with caution).

_Note See forceLocalMacro to only apply the method on a specific instance instead of globally on the prototype constructor_

```js
errors().get('name'); 
// Output: 'Name field is required'

errors().forceMacro('get', function (field) {
    return this.list(field).join(', ');
});

errors().get('name'); 
// Output: 'Name field is required, Name field can not be greater than 3 characters, Name field must be a string'
```

[View source on GitHub](https://github.com/zhorton34/vuejs-validators/blob/master/src/messages/forceMacro.js)
