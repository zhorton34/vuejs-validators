## After Rule
(Date)

The Field under evaluation must be after the compared date

> Passes After (Date) Rule
```js
let form = { 
    one: '4-22-1997', 
    two: '2-2-1997' 
}

let rules = {
  one: 'after:4-23-1997',
  two: 'after:2-3-1996',
}
```

> Fails After (Date) Rule
```js
let form = { 
    one: '4-22-1997', 
    two: '2-12-1997' 
}

let rules = {
  one: 'after:4-22-1998',
  two: 'after:1-11-1996',
}
```
