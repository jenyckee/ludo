var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  debug: true,
  // devtool: '#eval-source-map',
  context: path.join(__dirname, 'app', 'js'),

  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    './main',
    '../css/main.scss'
  ],

  output: {
    path: path.join(__dirname, 'app', 'js'),
    publicPath: '/',
    filename: '[name].js'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: 'true',
      hash: 'true'
    }),
    function() {
      this.plugin("done", function(stats) {
        require("fs").writeFileSync(
          path.join(__dirname, "stats.json"),
          JSON.stringify(stats.toJson()));
      });
    }
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
