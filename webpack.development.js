module.exports = (env) => ({
	devtool: 'inline-source-map',
	devServer: {
		port: 8000,
		open: true,
		contentBase: path.resolve('./dist'),
		hot: true
	},
});
