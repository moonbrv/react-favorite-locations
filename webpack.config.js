'use strict'

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssnano = require('cssnano');
const rimraf = require('rimraf');
const autoprefixer = require('autoprefixer');

const NODE_ENV = process.env.NODE_ENV || 'development';

console.log('*********************************')
console.log('----- ' + 'NODE_ENV = ' + NODE_ENV + ' -----');
console.log('*********************************')

module.exports = {
	resolve: {
		extensions: ['', '.js', '.css', '.json']
	},

	entry: 
	{
		main: __dirname + '/assets/js/index'
	},
	
	output: {
		path: __dirname + '/public',
		publicPath: '/',
		filename: '[name].bundle.js',
		chunkFilename: '[id].bundle.js'
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
			loader: 'style!css!postcss'
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
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		
		{
		/**
		*sync delete public folder, because when you use clean-webpack-plugin 
		*and want to combo "webpack && webpack-dev-server --hot --inline"
		*plugin will launch two times, when webpack start building process, 
		*and second time right before launch dev-server, server have no folder to serve from
		*so i use rifraf :P
		*/
			apply: (compiler) => {
				rimraf.sync(compiler.options.output.path)
			}
		},
		new webpack.optimize.CommonsChunkPlugin({
			children: true,
			async: true
		}),
		new HtmlWebpackPlugin({
			template: __dirname + '/assets/index.tmpl.html',
			filename: __dirname + '/public/index.html'
		}),
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV)
		}),
	],
	node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty'
	}
}