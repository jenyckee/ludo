var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    './src/index.js',
  ],

  output: {
    library: 'Ludo',
    libraryTarget: 'umd'
  },

  plugins: [
    new webpack.ProvidePlugin({
      'R': 'ramda'
    })
  ],

  module: {
    loaders: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loaders: ['babel-loader']
        }
    ]
  }
};
