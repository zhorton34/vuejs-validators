# Macro
Extend errors message bag instance using macros
_Note See localMacro to only apply the method on a specific instance instead of globally on the prototype constructor_

```js
errors().macro('count', function () {
    return this.list().length();
});

// errors().count() === errors().list().count();
```

[View source on GitHub](https://github.com/zhorton34/vuejs-validators/blob/master/src/messages/macro.js)
