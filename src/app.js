import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import webpack from 'webpack'
import path from 'path'
import validator from 'express-validator'
import dotenv from 'dotenv'
import config from '../webpack.dev'
import prodConfig from '../webpack.prod'
import routes from './server/routes'
import HMR from 'webpack-hot-middleware'
import 'babel-core/register'
import 'babel-polyfill'
import webpackDevMiddleware from 'webpack-dev-middleware'
dotenv.config()
let compiler
const app = express()

const checkEnvironment = function () {
  if (process.env.NODE_ENV === 'production') {
    compiler = webpack(prodConfig)
  } else {
    compiler = webpack(config)
    app.use(HMR(compiler))
  }
}

checkEnvironment()
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(validator())

routes(app)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'))
})

app.all('*', (req, res) => {
  res.status(404).send({
    message: 'Route does not exist'
  })
})
export default app
