## Gte Rule
(Greater Than Or Equal - Numeric)
Number must be greater than or equal to compared value

> Passing greater than or equal rule (gte)
```js

let form = {
    age: 24,
    members: 19,
    percentage: 0.4,
};

let rules = {
    age: 'gte:24',
    members: 'gte:10',
    percentage: 'gte:0.35',
};
```

> Failing greater than or equal rule (gte)
```js
 
 let form = {
     age: 24,
     members: 19,
     percentage: 0.4,
 };
 
 let rules = {
     age: 'greater_than:25',
     members: 'greater_than:100',
     percentage: 'greater_than:0.9',
 };
 ```
