import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import validator from 'express-validator';
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());

// home route
app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the Homepage.',
}));

app.param('userId', function (req, res, next, id) {
  console.log('CALLED ONLY ONCE');
  next();
});
// Require our routes into the application.
require('../server/routes')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;