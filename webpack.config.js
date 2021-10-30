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
			publicPath: '/assets/js/',
			path: path.resolve(__dirname, 'dist/assets/js'),
		},
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					use: 'babel-loader',
					exclude: /(node_modules)/,
				},
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /(node_modules)/,
				},
				{
					test: /\.svg$/,
					use: 'raw-loader',
					exclude: /(node_modules)/,
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
			fallback: { stream: false },
		},
		optimization: {
			minimize: args.mode === 'production',
			minimizer: [
				new TerserPlugin({
					terserOptions: {
						// keep_classnames: true,
					},
				}),
			],
		},
		mode: args.mode === 'production',
		devServer: {
			static: {
				directory: path.join(__dirname, 'dist'),
			},
			compress: false,
			host: '0.0.0.0',
			port: 3000,
			hot: true,
			historyApiFallback: {
				rewrites: [{ from: /^\/$/, to: '/index.html' }],
			},
		},
	}
}
