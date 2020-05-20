## Greater Than Rule
(Numeric)

Number must be greater than compared value

> Passing greater than rule
```js

let form = {
    age: 24,
    members: 19,
    percentage: 0.4,
};

let rules = {
    age: 'greater_than:13',
    members: 'greater_than:10',
    percentage: 'greater_than:0.35',
};
```

> Failing greater than rule
```js
 let form = {
     age: 24,
     members: 19,
     percentage: 0.4,
 };
 
 let rules = {
     age: 'greater_than:24',
     members: 'greater_than:100',
     percentage: 'greater_than:0.9',
 };
 ```
