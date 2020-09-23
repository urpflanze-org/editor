const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = (env, args) => {
	return {
		entry: {
			'@babel/polyfill': '@babel/polyfill',
			app: path.resolve(__dirname, 'src/index.tsx'),
			deamon: path.resolve(__dirname, 'src/workers/deamon/Deamon.ts'),
		},
		output: {
			filename: '[name].js',
			chunkFilename: '[name].chunk.js',
			publicPath: '/',
			path: path.resolve(__dirname, 'dist'),
		},
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					use: 'babel-loader',
					exclude: /(node_modules|old)/,
				},
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /(node_modules|old)/,
				},
				{
					test: /\.svg$/,
					use: 'raw-loader',
					exclude: /(node_modules|old)/,
				},
			],
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js', '.jsx'],
			plugins: [
				new TsconfigPathsPlugin({
					/*configFile: "./path/to/tsconfig.json" */
				}),
			],
		},
		optimization: {
			minimize: args.mode === 'production',
			minimizer: [
				new TerserPlugin({
					terserOptions: {
						// keep_classnames: true
					},
				}),
			],
		},
		devServer: {
			contentBase: path.join(__dirname, 'dist'),
			compress: true,
			host: '0.0.0.0',
			port: 3000,
			hot: true,
			historyApiFallback: {
				rewrites: [{ from: /^\/$/, to: '/index.html' }],
			},
		},
	}
}
