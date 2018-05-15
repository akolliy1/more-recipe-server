import webpack from 'webpack'
import path from 'path'
// to allow Dotenv files
import Dotenv from 'dotenv-webpack'
// to build different html template by replacing default html template
import HtmlWebpackPlugin from 'html-webpack-plugin'
// to clean the /dist folder before each build,
import CleanWebpackPlugin from 'clean-webpack-plugin'
// poll is reloading every seconds the files is change
// aggregateTimeout Add a delay before rebuilding once the first file changed.
import WebpackDevServer from 'webpack-dev-server'

const Option = {
  poll: 1000,
  aggregateTimeout: 1000,
  ignored: /node_modules/
}
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
  devServer: {
    contentBase: './dist',
    colors: true
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv({
      path: './.env',
      safe: true
    }),
    new WebpackDevServer({
      watch: Option
    })
  ],
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
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  }
}

// watchOptions: {
//   poll: 1000,
//     aggregateTimeout: 1000,
//       ignored: /node_modules/
// },
