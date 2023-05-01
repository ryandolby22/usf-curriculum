# Broken App Issues

- packages not installed: express, axios
- package imports should be const, not let or var
- did not tell Express to parse request bodies for either form data or JSON:
  > - app.use(express.json());
  > - app.use(express.urlencoded({ extended: true }));
- missing a Promise.all() when mapping over results data; THEN we can map over the promised results and get name, bio
- error handler goes nowhere, missing generic error handler
- app.listen is missing a callback
- inconsistent returns inside try catch: try has a return, but catch does not
- catch is missing an argument param (err)