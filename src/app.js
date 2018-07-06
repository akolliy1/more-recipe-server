import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import webpack from 'webpack';
// import path from 'path';
import validator from 'express-validator';
import dotenv from 'dotenv';
import HMR from 'webpack-hot-middleware';
import 'babel-core/register';
import 'babel-polyfill';
import webpackDevMiddleware from 'webpack-dev-middleware';
import config from '../webpack.dev';
import prodConfig from '../webpack.prod';
import routes from './server/routes';

const app = express();

dotenv.config();
let compiler;

if (process.env.NODE_ENV === 'production') {
  compiler = webpack(prodConfig);
} else {
  compiler = webpack(config);
  app.use(HMR(compiler));
}

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(validator());

routes(app);

app.use('/', express.static('dist'));
app.use('*', express.static('dist'));

export default app;
