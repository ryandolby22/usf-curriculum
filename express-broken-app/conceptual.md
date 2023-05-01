### Conceptual Exercise

Answer the following questions below:

1. **What are some ways of managing asynchronous code in JavaScript?**

> 1. Callbacks - allow you to provide functions to call once the asynchronous method has finished running
> 2. Promises - allow you to chain methods together. Error handling with promises is also less complex, needing 1 catch for all vs each.
> 3. Async/Await - provides a cleaner method of writing promises and gives the user more control over execution order. Error handling for async function calls is provided using a try/catch block.

2. **What is a Promise?**

> A promise is an object which can be returned synchronously from an asynchronous function.
>
> - pending: initial state, neither fulfilled nor rejected.
> - fulfilled: meaning that the operation was completed successfully.
> - rejected: meaning that the operation failed.

3. **What are the differences between an async function and a regular function?**

> An async function returns a promise and you can use the await keyword to get the value. It helps you with cases where you have a bunch of asynchronous actions happening one after the other.
> Regular functions run sequentially. It can be called and while the operation is performed you can execute another function B (asynchronous or not)

4. **What is the difference between Node.js and Express.js?**

> - Node.js: Node.js is an open source and cross-platform runtime environment for executing JavaScript code outside of a browser. It is not a framework and it’s not a programming language.
> - Express.js: Express is a small framework that sits on top of Node.js’s web server functionality to simplify its APIs and add helpful new features. It makes it easier to organize your application’s functionality with middle ware and routing.

5. **What is the error-first callback pattern?**

> The error-first pattern consists of executing a function when the asynchronous operation ends (such as an incoming AJAX response) which takes as first argument an error, if one occurred, and the result of the request as extra arguments.

6. **What is middleware?**

> It is code that runs in the middle of the request / response cycle! They are functions that get access to the req and res objects and can also call the next
> function. 404 and global error handler are example of middleware.

7. **What does the `next` function do?**

> The next function is a function in the Express router which, when invoked, executes the middleware succeeding the current middleware. Middleware functions can perform the following tasks: Execute any code. Make changes to the request and the response objects.

8. **What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)**

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```

> The code container contains multiple await keywords in a single function. Since we are making three requests sequentially, each request must wait for the previous request before starting; but the requests are totally independent! This can really slow down our applications. Not all requests may come back with a response and the entire thing may fail.
> Instead, we can await once the requests have been sent off and start the requests in parallel rather in sequence, or we can use a Promise.all() to await multiple resolved promises.