import path from "path";
import webpack from "webpack";

export default {
	entry: [ 
		path.join(__dirname, '/client/index.js')
	],
	output: {
		path: '/',
		publicPath: '/'
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
	module : {
	    loaders : [
	      	{
	        	test : /\.jsx?/,
	        	include: [ path.join(__dirname, 'client') ],
	        	loader : 'babel'
	      	},
	      	{
	      		test: /\.css$/,
	      		loader: 'style-loader!css-loader'
	      	}
	    ]
	}
}