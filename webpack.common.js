import webpack from 'webpack'
import path from 'path'
// to allow Dotenv files
import Dotenv from 'dotenv-webpack'
// to build different html template by replacing default html template
import HtmlWebpackPlugin from 'html-webpack-plugin'
// to clean the /dist folder before each build,
import CleanWebpackPlugin from 'clean-webpack-plugin'
// eval-source-map is slow, but it provides fast rebuild speed and yields real files. Line numbers are correctly mapped
// alternative is cheap-eval-source-map - it only maps line numbers
// poll is reloading every seconds the files is change
// aggregateTimeout Add a delay before rebuilding once the first file changed.
// webpackDevServer is meant for create server it has built-in https
// import WebpackDevServer from 'webpack-dev-server'

module.exports = {
  entry: [path.join(__dirname, 'client/index.jsx')],
  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'client/dist/')
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
    })
  ],
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
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
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
