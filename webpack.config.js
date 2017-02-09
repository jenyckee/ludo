var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    './src/index.ts',
  ],

  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js', ''] // note if using webpack 1 you'd also need a '' in the array as well
  },

  output: {
    library: true,
    libraryTarget: 'commonjs'
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
        },
        { test: /\.ts(x?)$/, loader: 'babel-loader!ts-loader' }
    ]
  }
};
