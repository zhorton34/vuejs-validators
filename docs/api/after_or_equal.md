## After Or Equal Rule
(Date)
The field under validation must be after or equal to the compared date.

> Passes After Or Equal (Date) Rule
```js
let form = { 
    one: '4-22-1997',
    two: '1-11-2013', 
}

let rules = {
  one: 'after_or_equal:4-22-1997',
  two: 'after_or_equal:2-12-2014',
}
```

> Fails After Or Equal (Date) Rule
```js
let form = { 
    one: '4-22-1997',
    two: '2-12-1997' 
}

let rules = {
  one: 'after_or_equal:4-23-1997',
  two: 'after_or_equal:2-3-1996',
}
```
