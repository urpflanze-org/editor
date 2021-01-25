const webpack = require('webpack')

const node_env = process.argv.length >= 2 ? process.argv[2] : 'production'

process.env.NODE_ENV = node_env

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpackConfig = require('./webpack.config.js')

const config = webpackConfig(process.env, { mode: node_env })

if (!config.plugins) config.plugins = [new BundleAnalyzerPlugin()]
else config.plugins.push(new BundleAnalyzerPlugin())

webpack(config, (err, stats) => {
	if (err || stats.hasErrors()) {
		console.error(err)
	}
})
