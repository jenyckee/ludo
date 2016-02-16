var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    debug: true,
    // devtool: '#eval-source-map',
    // context: path.join(__dirname, 'app', js),
    // context: './',

    entry: [
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client',
        './app/js/main.js',
        './app/css/main.scss'
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
            // inject: 'true',
            hash: 'true',
            title: 'Custom template',
            template: 'index.ejs'
        }),
        function() {
            this.plugin('done', function(stats) {
                require('fs').writeFileSync(
                  path.join(__dirname, 'stats.json'),
                  JSON.stringify(stats.toJson()));
            });
        }
  ],

    module: {
        loaders: [
            {
                test: /\.js?$/,exclude: /node_modules/,
                loaders: ['babel']
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            }
        ]
    }
};
