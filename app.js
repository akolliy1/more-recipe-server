import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// home route
app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the Homepage.',
}));

// Require our routes into the application.
require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;