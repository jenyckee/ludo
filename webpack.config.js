var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
      './src/index.js',
    ],

    output: {
      library: 'ludo',
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
            loader: 'babel',
            query: {
               presets: ['es2015']
            }
          }
      ]
    }
};
