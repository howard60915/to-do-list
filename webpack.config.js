const path = require("path");
const nodeExternals = require('webpack-node-externals');
const slsw = require("serverless-webpack");


module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  target: "node",
  externals: [nodeExternals()],
  output: {
    libraryTarget: "commonjs",
    path: path.join(process.cwd(), ".webpack"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
};
