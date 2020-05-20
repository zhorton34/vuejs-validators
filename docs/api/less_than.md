## Less Than Rule
(Numeric)

Number must be less than compared value

> Passing less than rule
```js

let form = {
    age: 24,
    members: 19,
    percentage: 0.4,
} ;

let rules = {
    age: 'less_than:25',
    members: 'less_than:20',
    percentage: 'less_than:0.8',
}
```

> Failing less than rule
```js
 let form = {
     age: 24,
     members: 19,
     percentage: 0.4,
 };
 
 let rules = {
     age: 'less_than:24',
     members: 'less_than:10',
     percentage: 'less_than:0.1',
 }
 ```
