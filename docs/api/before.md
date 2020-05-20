## Before Rule
(Date)

The Field under evaluation must be before the compared date

> Passes Before (Date) Rule
```
let form = { 
    one: '4-22-1997', 
    two: '2-12-1997' 
}

let rules = {
  one: 'before:4-22-1998',
  two: 'before:2-12-1997',
}
```

> Fails Before (Date) Rule
```
let form = { 
    one: '4-22-1997', 
    two: '3-12-1997' 
}

let rules = {
  one: 'before:4-22-1997',
  two: 'before:2-3-1996',
}
```
