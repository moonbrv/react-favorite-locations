'use strict'

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var NODE_ENV = process.env.NODE_ENV || 'development';

console.log('*********************************')
console.log('----- ' + 'NODE_ENV = ' + NODE_ENV + ' -----');
console.log('*********************************')

module.exports = {
	resolve: {
		extensions: ['', '.js', '.css', '.json']
	},

	entry:  ['babel-polyfill' , __dirname + '/assets/js/index.js'],
		/*{
			polyfill: 'babel-polyfill',
			main: __dirname + '/assets/js/index.js'
		},*/
	
	output: {
		path: __dirname + '/public/js',
		publicPath: '/',
		filename: 'bundle.js',
	},

	devtool: NODE_ENV == 'development' ? 'cheap-module-source-map': null,

	devServer: {
		contentBase: __dirname + '/public',
		colors: true,
		historyApiFallback: true
	},

	module: {
		preLoaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint'
			}
		],
		loaders: [
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style', 'css!postcss')
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					cacheDirectory: true
				}
			},
		]
	},

	postcss: [
		require('autoprefixer')
	],

	sassLoader: {
		outFile: __dirname + '/public/css',
		outputStyle: NODE_ENV == 'development' ? 'nested' : 'compressed'
	},

	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
			comments: false
		}),
		new HtmlWebpackPlugin({
			template: __dirname + '/assets/index.tmpl.html',
			filename: __dirname + '/public/index.html'
		}),
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV)
		}),
		new ExtractTextPlugin(
			'../css/style.css',
			{
				allChunks: true,
				disable: NODE_ENV == 'development'
			})
	]
}