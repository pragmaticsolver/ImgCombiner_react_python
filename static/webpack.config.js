const webpack = require('webpack');
const config = {
	entry: __dirname + '/js/index.jsx',
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js',
	},
	resolve: {
		extensions: ['.js', '.jsx', '.css']
	},
	module: {
		rules: [
			{
				test: /\.jsx?/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['react']
						}
					}
				]
			},
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] },
			{
				test: /\.(jpg|png|svg)$/,
				loader: 'url-loader',
				options: {
					limit: 25000,
				},
			},
			{
				test: /\.(jpg|png|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[path][name].[hash].[ext]',
				},
			},
		]
	}
};
module.exports = config;