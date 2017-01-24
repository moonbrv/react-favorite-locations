const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
	resolve: {
		extensions: ['', '.js', '.css', '.json'],
	},

	entry:
	{
		main: path.join(__dirname, '/assets/js/index'),
	},

	output: {
		path: path.join(__dirname, '/devbuild'),
		publicPath: '/',
		filename: '[name].bundle.js',
		chunkFilename: '[id].bundle.js',
	},

	devtool: 'cheap-module-source-map',

	devServer: {
		contentBase: path.join(__dirname, '/assets'),
		historyApiFallback: true,
		stats: {
			colors: true,
			chunks: false,
			reasons: true,
		},
	},

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
				loader: 'style!css!postcss',
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
				include:/node_modules\/bootstrap\/dist/,
				loader: 'file?name=[1]&regExp=node_modules/bootstrap/dist/(.*)'
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
		new HtmlWebpackPlugin({
			template: path.join(__dirname, '/assets/index.tmpl.html'),
			filename: path.join(__dirname, '/devbuild/index.html'),
		}),
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV),
		}),
	],
};
