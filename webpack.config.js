var webpack      = require('webpack');
var precss       = require('precss');
var autoprefixer = require('autoprefixer');

module.exports = {
  entry     : [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.jsx'
  ],
  module    : {
    loaders : [{
      test    : /\.jsx?$/,
      exclude : /node_modules/,
      loader  : 'react-hot!babel'
    }, {
      test   : /\.css$/,
      loader : 'style-loader!css-loader!postcss-loader'
    },
    {
      test    : /\.(jpe?g|png|gif|svg)$/i,
      loaders : [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
      ]
    },
    {
      test : /\.woff$|\.ttf$|\.wav$|\.mp3$/,
      loader: "file"
    }]
  },
  resolve   : {
    extensions : ['', '.js', '.jsx']
  },
  output    : {
    path       : __dirname + '/dist',
    publicPath : '/',
    filename   : 'bundle.js'
  },
  devServer : {
    contentBase : './dist',
    hot         : true
  },
  plugins   : [
    new webpack.HotModuleReplacementPlugin()
  ],
  postcss   : function () {
    return [precss, autoprefixer];
  }
};