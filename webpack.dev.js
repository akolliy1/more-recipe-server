import merge from 'webpack-merge'
import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import common from './webpack.common.js'
// to allow Dotenv files
import Dotenv from 'dotenv-webpack'

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
