var CommonsChunkPlugin = require("CommonsChunkPlugin");
module.exports = {
  entry:[
    './entry.js',
  ],
  loaders: [{
	    test: /\.less/,
	    loader:  'style-loader!css-loader!less-loader'
	}, {
	  test: /\.(png|jpg)$/,
	  loader: 'url-loader?limit=10000&name=build/[name].[ext]'
  }],
  plugins: [ new CommonsChunkPlugin("common.js") ],
  output: {
    path: __dirname + '/output/',
    publicPath: "/output/",
    filename: 'result.js'
  }
};