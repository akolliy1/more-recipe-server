import merge from 'webpack-merge'
import * as config from './webpack.config.js'

module.exports = merge(config, {
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './client/dist'
  }
})
