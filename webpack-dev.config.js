const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

	// https://webpack.js.org/concepts/entry-points/#object-syntax
	entry: [
		'./src/app.js', 
		'./src/app.scss'
	],

	// https://webpack.js.org/configuration/output/#output-library
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},

	// https://webpack.js.org/concepts/mode/#usage
	mode: 'development',

	// https://webpack.js.org/configuration/devtool/
	devtool: 'source-map',

	// https://webpack.js.org/concepts/loaders/
	module: {
		rules: [

			{
				// http://ccoenraets.github.io/es6-tutorial/setup-webpack/
				// Babel loader
				test: /\.js/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env'
						],
						plugins: [
							'@babel/plugin-proposal-class-properties'
						]
					}
				}
			},

			{
				// https://github.com/webpack-contrib/sass-loader
				// compoile sass in css
				test: /\.scss/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				})
			},

			{
				// https://survivejs.com/webpack/loading/fonts/
				// Font and images loader
				test: /\.(ttf|eot|woff|woff2|jpg|png|gif)$/,
				use: {
					loader: 'file-loader'
				}
			}

		]
	},


	// https://webpack.js.org/configuration/resolve/
	resolve: {
		alias: {
			'@components': path.resolve(__dirname, 'src/components'),
			'@shared': path.resolve(__dirname, 'src/shared')
		}
	},

	// https://webpack.js.org/configuration/plugins/
	plugins: [

		// https://www.npmjs.com/package/webpack-notifier
		new WebpackNotifierPlugin(),

		// gestione nomenclatura output file css
		new ExtractTextPlugin({
			filename: 'bundle.css'
		}),

		// first static homepage
		new HtmlWebpackPlugin({
			title: 'Homepage',
			filename: 'index.html'
		})

	],


	// https://github.com/webpack/webpack-dev-server
	devServer: {

		// https://webpack.js.org/configuration/dev-server/#devserverhost
		host: '0.0.0.0',
		index: 'index.html',

		// https://webpack.js.org/configuration/dev-server/#devservercontentbase
		contentBase: [
			path.join(__dirname, './statics')
		],

		// we can set the port with `$ export PORT={port}` before run webpack
		port: process.env.PORT || 9000,

		compress: true, // gzip compression
		progress: true,

		// https://webpack.js.org/configuration/dev-server/#devserver-overlay
		overlay: true
	}
};
