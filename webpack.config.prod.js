const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Purify = require('purifycss-webpack-plugin');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'production';

module.exports = {
	resolve: {
		extensions: ['', '.html', '.js', '.css', '.json'],
	},

	entry:
	{
		main: path.join(__dirname, '/assets/js/index'),
	},

	output: {
		path: path.join(__dirname, '/dist'),
		publicPath: '',
		filename: '[name].bundle-[hash:6].js',
		chunkFilename: '[id].bundle-[hash:6].js',
	},

	devtool: null,

	module: {
		preLoaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint',
			},
		],
		loaders: [
			{
				test: /\.json$/,
				loader: 'json',
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style', 'css!postcss'),
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					cacheDirectory: true,
				},
			},
			{ // copy glyph-icons fonts
				test: /\.(ttf|eot|svg|woff|woff2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				include: /node_modules\/bootstrap\/dist/,
				loader: 'file?name=[1]&regExp=node_modules/bootstrap/dist/(.*)',
			},
			{ // copy images from assets to public with its original paths and name
				test: /\.(jpg|png|svg)$/,
				include: /assets/,
				loader: 'file?name=[1]&regExp=assets/(.*)',
			},
		],
	},

	postcss: [
		autoprefixer({
			browsers: [
				'last 2 versions',
			],
		}),
		cssnano(),
	],

	externals: {
		cheerio: 'window',
		'react/lib/ExecutionEnvironment': true,
		'react/lib/ReactContext': true,
	},

	plugins: [
		new webpack.NoErrorsPlugin(),

		new webpack.optimize.OccurenceOrderPlugin(),

		new CleanWebpackPlugin(['dist']),

		new webpack.optimize.CommonsChunkPlugin({
			children: true,
			async: true,
		}),

		new webpack.optimize.DedupePlugin(),

		new webpack.optimize.UglifyJsPlugin({
			beautify: false,
			comments: false,
			compress: {
				sequences: true,
				booleans: true,
				loops: true,
				unused: true,
				warnings: false,
				drop_console: true,
				unsafe: true,
			},
		}),

		new HtmlWebpackPlugin({
			template: path.join(__dirname, '/assets/index.tmpl.html'),
			filename: path.join(__dirname, '/dist/index.html'),
		}),
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV),
		}),
		new ExtractTextPlugin(
			'style-[hash:6].css'
		),
		new Purify({
			basePath: __dirname,
			paths: [
				'./assets/*.html',
				'./assets/js/**/*.js',
			],
			resolveExtensions: ['.html', '.js'],
			purifyOptions: {
				minify: true,
				info: true,
			},
		}),
	],
};
