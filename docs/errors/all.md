# All
Return "all" error messages as object of fields with list of their error messages  

```js 
errors().all(); 
```

``` 
{
    name: ['Name field is required', 'Name field must have at lest 3 characters'],
    email: ['Email field must be an email', 'Email field must have at least 3 characters']
}
```


[View source on GitHub](https://github.com/zhorton34/vuejs-validators/blob/master/src/messages/all.js)
