const path = require('path');

module.exports = {
	entry: [
		path.resolve('src', 'index.js')
	],
	output: {
		path: path.resolve('dist'),
		filename: 'bundle.js'
	},
	node: {
		fs: 'empty'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: [
						['@babel/preset-env', {
							'targets': {
								'node': 'current',
								'browsers': 'last 2 versions'
							}
						}]
					],
					plugins: [
						'@babel/plugin-proposal-class-properties'
					]
				}
			}
		]
	},
	resolve: {
		modules: [
			path.resolve('src'),
			'node_modules'
		]
	},
	devtool: 'source-map',
	devServer: {
		port: 8000,
		open: true,
		contentBase: path.resolve('dist'),
		watchContentBase: true
	}
};
