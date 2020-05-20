## Date Equals Rule
(Date)
The field under validation must be the same date as the rules date

> Passes Date Equals Rule
```js
let form = { 
    one: '4-22-1997',
    two: 'April 22 2025' 
}

let rules = {
  one: 'date_equals:4-22-1997',
  two: 'date_equals:April 22 2025',
}
```

> Fails Date Equals Rule
```js
let form = { 
    one: '4-22-1997',
    two: '2-12-1997' 
}

let rules = {
  one: 'date_equals:4-24-1998',
  two: 'date_equals:1-11-1996',
}
```
