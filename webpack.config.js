var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')

// Hack for Ubuntu on Windows: interface enumeration fails with EINVAL, so return empty.
try {
  require('os').networkInterfaces()
} catch (e) {
  require('os').networkInterfaces = () => ({})
}

module.exports = {
  context: __dirname + '/src',
  entry: [
    'react-hot-loader/patch',
    'webpack/hot/only-dev-server',
    './app.js'
  ],
  output: {
    filename: 'app.[hash].js',
    path: __dirname + '/dist'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.template.html',
      inject: 'body'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.png$/, loader: 'url-loader?limit=100000' },
      { test: /\.jpg$/, loader: 'file-loader' }
    ]
  }
}
