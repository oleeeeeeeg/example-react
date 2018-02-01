"use strict";
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = function() {
	const opts = {
		PROD: false
	};
	let webpackConfig = {
		resolve: {
			extensions: [".js", ".jsx", ".json"]
		},
		entry: {
			app: ['./src/index.js']
		},
		output: {
			path: path.resolve(__dirname, './build_dev'),
			filename: 'application.js',
			publicPath: ""
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: [{
						loader: 'babel-loader'
					}]
				},
				{
					test: /\.jsx$/,
					exclude: /node_modules/,
					use: [{
						loader: 'babel-loader'
					}]
				},
				{
					test: /\.json$/,
					use: 'json-loader',
				},
				{
					test: /\.less/,
					exclude: /release|debug|node_modules/,
					use: [
						'style-loader',
						{
							loader: 'css-loader',
							options: {minimize: true},
						},
						'postcss-loader',
						'less-loader',
					],
				},
				{
					test: /\.css/,
					exclude: /release|debug/,
					use: [
						'style-loader',
						{loader: 'css-loader', options: {importLoaders: 1}},
						'postcss-loader',
					],
				},
				{
					test: /\.(jpe?g|png|gif|svg)$/i,
					exclude: /release|debug/,
					use: [{
						loader: 'url-loader',
						options: {
							name: `img/[name]-[hash:6].[ext]`,
							limit: 50000,
						},
					}],
				},
                {
                    test: /\.(ttf|woff(2)?)(\?[a-z0-9]+)?$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: `fonts/[name]-[hash:6].[ext]`,
                            limit: 10000,
                        },
                    }],
                },
                {
                    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: `fonts/[name]-[hash:6].[ext]`,
                            limit: 10000,
                        },
                    }],
                },
				{
					test: /\.js|\.jsx$/,
					exclude: /node_modules/,
					use: [{
						loader: `ifdef-loader`,
						options: opts
					}],
				},
			]
		},

		plugins: [
			new HtmlWebpackPlugin({
				filename: "index.html",
				template: "./src/index.html",
				inject: "body"
			}),
			new CopyWebpackPlugin([

			])
		]
	};

	return webpackConfig;
};
