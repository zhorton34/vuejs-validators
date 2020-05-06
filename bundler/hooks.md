# Validator Life Cycle Hooks

> `Hook into validation life cycle and add custom functionality`

## Available Life Cycle Hooks
- before
- passed
- failed
- after

_NOTE: The "After" hook runs prior to failed or passed_

## All Life Cycle Hooks
- May Register callbacks
- May Register more than one callback
- Forgets Registered callback after it's run
- Registered callbacks accept the validator instance

## Before Life Cycle Hook
> `Before validation rules are checked`

### Before Life Cycle Hook Example
```js

validator(data, rules).before(validation => {
    validation.extend({
        uppercase: [
            ':attribute mst be upper case',
            ({ value }) => value === value.toUpperCase()
        ]
    })
})
```

## After Life Cycle Example
> `After validation rules are checked`

### After Life Cycle Hook Example
```js
// Within vue instance, you can call another method
validator(data, rules).after(validation => {
    validation.errors.add('custom', 'Add Custom Error Message')
});
```

## Passed Life Cycle Hook
> `Runs when validation data passed validation rules`

### Passed Life Cycle Hook Example
```js
validator(data, rules).passed((validation) => {
    axios.post('/data', data).then(response => {
        window.location = '/home';
    })
    .catch(errors => console.error)
});
```

## Failed Life Cycle Hook
> `Runs when validation data failed validation rules`

### Failed Life Cycle Hook Example
```js

validator(data, rules).failed(validation => {
   console.log('error messages: ', validation.errors.all())
});
```
