/** Given a list of GitHub users names, this should return information about those developers.
 * Should get JSON body like {developers: [username, ...]}
 * Should return [ {name, bio}, ... ]
 */

 const express = require('express');
 const usersRoutes = require('./routes/users');
 const ExpressError = require('./expressError');
 const morgan = require('morgan');
 
 const app = express();
 
 app.use(morgan('dev'));
 app.use(express.json());
 app.use('/users', usersRoutes); // apply a prefix to every route in usersRoutes
 app.get('/favicon.ico', (req, res) => res.sendStatus(204)); // hides console error if no favicon
 
 // 404 HANDLER
 app.use((req, res, next) => {
   const e = new ExpressError('Page Not Found', 404);
   next(e);
 });
 
 // GENERIC ERROR HANDLER
 app.use((err, req, res, next) => {
   let status = err.status || 500;
   let message = err.message;
   return res.status(status).json({ err: { message, status } });
 });
 // END GENERIC ERROR HANDLER
 
 app.listen(3000, () => {
   console.log('Server running on port 3000');
 });