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
    filename: 'dist/index.js',
    library: true,
    libraryTarget: 'commonjs2'
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
      { test: /\.tsx?$/, loader: 'babel-loader!ts-loader' }
    ]
  }
};
