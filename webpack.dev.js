const merge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const common = require('./webpack.common.js')
// to allow Dotenv files
const Dotenv = require('dotenv-webpack')

module.exports = merge(common, {
  mode: 'development',
  entry: {
    app: './src/index.js',
    print: './client/index.jsx'
  },
  devtool: 'cheap-eval-source-map',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new Dotenv({
      path: './.env',
      safe: false
    }),
    new HtmlWebpackPlugin({
      template: './client/index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ],
  stats: {
    colors: true
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  }
})
