## Lte Rule
(Less than or equal - Numeric)

Number must be less than or equal to compared value

> Passing Less than or equal (lte) rule
```js

let form = {
    age: 24,
    members: 19,
    percentage: 0.4,
} ;

let rules = {
    age: 'lte:24',
    members: 'lte:20',
    percentage: 'lte:0.8',
}
```

> Failing less than or equal (lte) rule
```js
 let form = {
     age: 24,
     members: 19,
     percentage: 0.4,
 };
 
 let rules = {
     age: 'less_than:24',
     members: 'less_than:10',
     percentage: 'less_than:0.5',
 }
 ```
