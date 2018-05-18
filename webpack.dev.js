// import webpack from 'webpack'
const webpack = require('webpack')
// import merge from 'webpack-merge'
const merge = require('webpack-merge')
// import * as common from './webpack.common.js'
const common = require('./webpack.common.js')
// to allow Dotenv files
// import Dotenv from 'dotenv-webpack'
const Dotenv = require('dotenv-webpack')
// to build different html template by replacing default html template
// import HtmlWebpackPlugin from 'html-webpack-plugin'
const HtmlWebpackPlugin = require('html-webpack-plugin')
// to clean the /dist folder before each build,
// import CleanWebpackPlugin from 'clean-webpack-plugin'
const CleanWebpackPlugin = require('clean-webpack-plugin')
// eval-source-map is slow, but it provides fast rebuild speed and yields real files. Line numbers are correctly mapped
// alternative is cheap-eval-source-map - it only maps line numbers
// poll is reloading every seconds the files is change
// aggregateTimeout Add a delay before rebuilding once the first file changed.
// webpackDevServer is meant for create server it has built-in https
// import WebpackDevServer from 'webpack-dev-server'

module.exports = merge(common, {
  devtool: 'eval-source-map',
  mode: 'development',
  devServer: {
    contentBase: './client/dist'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv({
      path: './.env',
      safe: true
    })
  ]
})
