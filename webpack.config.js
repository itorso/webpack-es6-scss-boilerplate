const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

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
	mode: 'production',

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

		// https://github.com/johnagan/clean-webpack-plugin
		new CleanWebpackPlugin(['dist']),
		
		// gestione nomenclatura output file css
		new ExtractTextPlugin({
			filename: 'bundle.css'
		}),

		// https://github.com/NMFR/optimize-css-assets-webpack-plugin
		new OptimizeCSSAssetsPlugin({
		  assetNameRegExp: /\.css$/g,
		  cssProcessor: require('cssnano'),
		  cssProcessorPluginOptions: {
		    preset: ['default', { discardComments: { removeAll: true } }],
		  },
		  canPrint: true
		}),

		// first static homepage
		new HtmlWebpackPlugin({
			title: 'Homepage',
			filename: 'index.html'
		})

	]
};
