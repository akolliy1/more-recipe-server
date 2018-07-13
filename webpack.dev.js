import merge from 'webpack-merge';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import common from './webpack.common';

module.exports = merge(common, {
  mode: 'development',
  entry: {
    reload: 'webpack-hot-middleware/client?reload=true',
    app: './src/index.js',
    print: './client/index.jsx'
  },
  devtool: 'cheap-eval-source-map',
  plugins: [
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
  }
});
