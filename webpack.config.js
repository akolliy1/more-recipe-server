import webpack from 'webpack'
import path from 'path'

module.exports = {
  entry: './client/index.jsx',
  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'client/dist/')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|)/i,
        use: ['file-loader']
      }
    ]
  }
}
