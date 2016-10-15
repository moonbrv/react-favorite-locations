// Karma configuration
// Generated on Sat Oct 15 2016 11:34:49 GMT+0300 (EEST)

module.exports = function(config) {
	config.set({

	// base path that will be used to resolve all patterns (eg. files, exclude)
	basePath: '',

	// frameworks to use
	// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
	frameworks: ['mocha'],

	// list of files / patterns to load in the browser
	files: [
		'./assets/js/**/*.js',
		'./test/**/*.test.js',
		'http://maps.googleapis.com/maps/api/js?sensor=false&language=en'
	],

	// list of files to exclude
	exclude: [
	],

	// preprocess matching files before serving them to the browser
	// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
	preprocessors: {
		'./test/**/*.test.js': ['webpack', 'sourcemap'],
		'assets/js/**/*.js': ['webpack', 'coverage']
	},

	webpack: {
		// devtool: 'inline-source-map', //just do inline source maps instead of the default
		// module: {
		// 	loaders: [
		// 		{
		// 			test: /\.js$/,
		// 			exclude: /\/node_modules\//,
		// 			loader: 'babel',
		// 			query: {
		// 				presets: ['es2015', 'react']
		// 			}
		// 		}
		// 	]
		// },
		// externals: {
		// 	'cheerio': 'window',
		// 	'react/addons': true,
		// 	'react/lib/ExecutionEnvironment': true,
		// 	'react/lib/ReactContext': true
		// }
	},

	webpackMiddleware: {
	// webpack-dev-middleware configuration
	// i. e.
	stats: 'errors-only'
	},

	'plugins' : [
		'karma-mocha',
		'karma-sinon',
		'karma-chai',
		'karma-webpack',
		'karma-phantomjs-launcher',
		'karma-sourcemap-loader',
		'karma-coverage'
	],

	// test results reporter to use
	// possible values: 'dots', 'progress'
	// available reporters: https://npmjs.org/browse/keyword/karma-reporter
	reporters: ['progress', 'coverage'],

	// web server port
	port: 9876,

	// enable / disable colors in the output (reporters and logs)
	colors: true,

	// level of logging
	// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
	logLevel: config.LOG_INFO,

	// enable / disable watching file and executing tests whenever any file changes
	autoWatch: true,

	// start these browsers
	// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
	browsers: ['PhantomJS'],

	// Continuous Integration mode
	// if true, Karma captures browsers, runs the tests and exits
	singleRun: false,

	// Concurrency level
	// how many browser should be started simultaneous
	concurrency: Infinity,

	coverageReporter: {
		type : 'lcov',
		dir : 'coverage/'
	}
	})
}
