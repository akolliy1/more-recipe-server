// import merge from 'webpack-merge'
const merge = require('webpack-merge')
// import * as config from './webpack.config.js'
const config = require('./webpack.config.js')

module.exports = merge(config, {
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './client/dist'
  }
})
