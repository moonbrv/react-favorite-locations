'use strict'

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'production';

console.log('*********************************')
console.log('----- ' + 'NODE_ENV = ' + NODE_ENV + ' -----');
console.log('*********************************')

module.exports = {
	resolve: {
		extensions: ['', '.js', '.css', '.json']
	},

	entry: 
	{
		main: __dirname + '/assets/js/index',
		vendor: ['react', 'react-dom', 'gmaps']
	},
	
	output: {
		path: __dirname + '/public',
		publicPath: '',
		filename: '[name].bundle.js',
		chunkFilename: '[id].bundle.js'
	},

	devtool: null,

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
		{ //copy glyph-icons fonts
			test: /\.(ttf|eot|svg|woff|woff2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			include:/node_modules\/bootstrap\/dist/,
			loader: 'file?name=[1]&regExp=node_modules/bootstrap/dist/(.*)'
		},
		
		{ //copy images from assets to public with its original paths and name
			test: /\.(jpg|png|svg)$/,
			include: /assets/,
			loader: 'file?name=[1]&regExp=assets/(.*)'
		}
		]
	},

	postcss: [
	autoprefixer({
		browsers: [
		'last 2 versions'
		]
	}),
	cssnano()
	],

	plugins: [
	new webpack.optimize.OccurenceOrderPlugin(),

	new webpack.optimize.CommonsChunkPlugin({
		name: 'vendor',
		filename: 'vendor.bundle.js',
		minChunks: Infinity
	}),
	new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		},
		output: {
			comments: false
		}
	}),
	new CleanWebpackPlugin(['public']),
	new HtmlWebpackPlugin({
		template: __dirname + '/assets/index.tmpl.html',
		filename: __dirname + '/public/index.html'
	}),
	new webpack.DefinePlugin({
		NODE_ENV: JSON.stringify(NODE_ENV)
	}),
	new ExtractTextPlugin(
		'style.css',
		{
			allChunks: true,
		}
		)
	],
	node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty'
	}
}