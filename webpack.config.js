const path = require('path');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const merge = require("webpack-merge");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');

const modeConfig = env => require(`./webpack.${ env }`)(env);

module.exports = ({ mode, presets } = { mode: 'production', presets: [] }) => {
	return merge({
		entry: [
			path.resolve('src', 'index.ts')
		],
		mode,
		devtool: 'source-map',
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, 'dist')
		},
		target: 'web',
		node: {
			fs: 'empty'
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					use: ['source-map-loader'],
					exclude: /node_modules/,
					enforce: 'pre'
				},
				{
					test: /\.tsx?$/,
					use: [
						{
							loader: 'awesome-typescript-loader',
							options: {
								configFileName: 'tsconfig.json'
							}
						}
					]
				},
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader'],
				},
				{
					test: /\.(png|jpg|bmp|tmx)$/,

					use: [{
						loader: 'file-loader',
						options: {
							emitFile: true,
							name: '[path][name].[ext]',
						}
					}]
				},
				{
					test: /\.(frag|vert)$/,
					use: 'raw-loader'
				}
			]
		},
		resolve: {
			extensions: ['.ts', '.js', '.frag', '.vert'],
			plugins: [
				new TsconfigPathsPlugin({
					configFile: "./tsconfig.json"
				})
			]
		},
		optimization: {
			splitChunks: {
				chunks: 'all'
			}
		},
		plugins: [
			new SimpleProgressWebpackPlugin({
				format: 'expanded'
			}),
			new CleanWebpackPlugin(['dist']),
			new HtmlWebPackPlugin({
				title: 'D&D Pixi'
			}),
			new CopyWebpackPlugin([{ from: './src/assets', to: 'assets' }]),
			new webpack.NamedModulesPlugin(),
			new webpack.HotModuleReplacementPlugin()
		]
	})
};
