import merge from 'webpack-merge';
// import path from 'path';
import webpack from 'webpack';
import dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// import CleanWebpackPlugin from 'clean-webpack-plugin';
import common from './webpack.common';

module.exports = merge(common, {
  mode: 'development',
  entry: {
    app: './client/index.js',
    // gap: './src/index.js',
    // print: './client/index.jsx'
  },
  devtool: 'cheap-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new dotenv({
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
