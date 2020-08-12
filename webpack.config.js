/* eslint-disable */

const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './assets/scripts/index.js',
    output: {
        path: path.resolve(__dirname, './static'),
        filename: 'scripts.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.json'],
		alias: {
			'@': path.resolve(__dirname, 'assets/scripts')
		}
    },
    performance: {
        hints: false
    },
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	]
};
