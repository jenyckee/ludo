var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    debug: true,
    // devtool: '#eval-source-map',
    // context: path.join(__dirname, 'app', js),
    // context: './',

    entry: [
        // 'webpack/hot/dev-server',
        // 'webpack-hot-middleware/client',
        './app/js/main.js',
        './app/css/main.scss'
    ],

    output: {
        path: path.join(__dirname, 'dist'),
        // publicPath: '/',
        filename: '[name].js'
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            // inject: 'true',
            // path: './dist',
            filename: 'index.html',
            hash: 'true',
            title: 'Custom template',
            template: './app/index.ejs'
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
