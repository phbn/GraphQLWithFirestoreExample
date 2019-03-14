const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');

module.exports = {
	entry: ['webpack/hot/poll?1000', './server/index'],
	watch: true,
	target: 'node',
	externals: [nodeExternals({ whitelist: ['webpack/hot/poll?1000'] })],
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							[require.resolve('babel-preset-env'), { "modules": false }],
							require.resolve('babel-preset-stage-3')
						],
						plugins: [require.resolve('babel-plugin-transform-runtime')]
					}
				},
				exclude: /node_modules/
			},
			{ test: /\.pem?$/, use: 'raw-loader' },
		],
	},
	plugins: [
    function()
    {
        this.plugin("done", function(stats)
        {
            if (stats.compilation.errors && stats.compilation.errors.length)
            {
                console.log(stats.compilation.errors);
                process.exit(1);
            }
            // ...
        });
    },
		new StartServerPlugin('server.js'),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env': { BUILD_TARGET: JSON.stringify('server') },
		}),
	],
	resolve: {
		// alias: {
		// 	'@g/actions': path.resolve(__dirname, '../../actions/'),
		// 	'@g/lib': path.resolve(__dirname, '../../lib/'),
		// 	'@g/reducers': path.resolve(__dirname, '../../reducers/')
		// },
		modules: [path.resolve('./node_modules')]
	},
	output: { path: path.join(__dirname, '.build'), filename: 'server.js' },
	stats: 'none',
};
