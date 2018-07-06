import path from 'path';

module.exports = {
  devServer: {
    contentBase: './dist'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.jsx', '.js', 'web.js']
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ['style-loader', {
          loader: require.resolve('css-loader'),
          options: {
            importLoaders: 1,
            modules: true,
            localIdentName: '[name]__[local]__[hash:base64:5]'
          }
        }]
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: './images/[hash].[ext]'
          }
        }
      },
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        include: path.join(__dirname, '/client')
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },
  node: {
    dns: 'empty',
    net: 'empty',
    fs: 'empty'
  }
};
