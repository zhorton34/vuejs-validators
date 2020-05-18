# Macro
Extend errors message bag instance using macros

```js
errors().macro('count', function () {
    return this.list().length();
});

// errors().count() === errors().list().count();
```

[View source on GitHub](https://github.com/zhorton34/vuejs-validators/blob/master/src/messages/macro.js)
