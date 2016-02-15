var webpack = require('webpack');
var path = require('path');

module.exports = {
  debug: true,
  devtool: '#eval-source-map',
  context: path.join(__dirname, 'app', 'js'),

  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    './main'
  ],

  output: {
    path: path.join(__dirname, 'app', 'js'),
    publicPath: '/js/',
    filename: 'bundle.js'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  module: {
    loaders: [
      {   
        test: /\.js?$/, 
        exclude: /node_modules/, 
        loaders: ['babel'] 
      },
      { 
          test: /\.css$/,
          loader: "style!css"
      },
      {
          test: /\.scss$/,
          loader: 'style!css!sass'
      }
    ]
  }
};
