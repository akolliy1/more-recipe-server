import * as common from './webpack.common.js'
import merge from 'webpack-merge'
import webpack from 'webpack'
import UglifyJSPlugin from 'uglifyjs-webpack-plugin'

module.exports = merge(common, {
  devtool: 'source-map',
  mode: 'production',
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
})
