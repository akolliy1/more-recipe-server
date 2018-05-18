// import path from 'path'
const path = require('path')
// to allow Dotenv files

module.exports = {
  entry: [path.join(__dirname, 'client/index.jsx')],
  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'dist/')
  },
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
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          query: {
            plugins: ['transform-class-properties', 'transform-object-rest-spread']
          },
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
