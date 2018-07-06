import merge from 'webpack-merge'
import webpack from 'webpack'
import UglifyJSPlugin from 'uglifyjs-webpack-plugin'
import * as common from './webpack.common.js'

module.exports = merge(common, {
  devtool: 'source-map',
  mode: 'production',
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
      cache: true,
      parallel: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
})
