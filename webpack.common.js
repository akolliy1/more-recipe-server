// import path from 'path'
const path = require('path')
// to allow Dotenv files
const merge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const common = require('./webpack.common.js')
const Dotenv = require('dotenv-webpack')

module.exports = {
  entry: {
    app: './src/index.js',
    print: './client/index.jsx'
  },
  devtool: 'cheap-eval-source-map',
  devServer: {
    contentBase: './client/dist'
  },
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
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  watch: true,
  watchOptions: {
    poll: 1000,
    aggregateTimeout: 1000,
    ignored: /node_modules/
  },
  resolve: {
    extensions: ['.jsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        use: ['file-loader']
      },
      {
        test: /\.js?x$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        },
        include: path.join(__dirname, '/client')
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  }
}

// plugin options for babel-loader
// plugins: [require('@babel/plugin-proposal-object-rest-spread')]
// entry: {
//   app: './client/index.jsx',
//   home: './client/index.jsx'
// },
