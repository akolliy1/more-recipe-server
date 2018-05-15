import webpack from 'webpack'
import path from 'path'
// to build different html template by replacing default html template
import HtmlWebpackPlugin from 'html-webpack-plugin'
// to clean the /dist folder before each build,
import CleanWebpackPlugin from 'clean-webpack-plugin'
// poll is reloading every seconds the files is change
// aggregateTimeout Add a delay before rebuilding once the first file changed.

module.exports = {
  entry: {
    app: './client/index.jsx',
    home: './client/index.jsx'
  },
  output: {
    filename: '[name].bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'client/dist/')
  },
  ],
  watchOptions: {
    poll: 1000,
    aggregateTimeout: 1000,
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  }
}
