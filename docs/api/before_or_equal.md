## Before Or Equal Rule
(Date)
The field under validation must be before or equal to the compared date.

> Passes Before Or Equal (Date) Rule
```
let form = { 
    one: '4-22-1997', 
    two: '2-12-1997' 
}

let rules = {
  one: 'before_or_equal:3-21-1998',
  two: 'before_or_equal:2-12-1997',
}
```

> Fails Before Or Equal (Date) Rule
```
let form = { 
    one: '4-22-1997', 
    two: '2-3-1997' 
}

let rules = {
  one: 'before_or_equal:4-23-1997',
  two: 'before_or_equal:2-3-1996',
}
```
