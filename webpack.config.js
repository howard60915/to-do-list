const path = require("path");
const nodeExternals = require('webpack-node-externals');
const slsw = require("serverless-webpack");


module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  devtool: 'source-map',
  resolve: {
    // fixes https://github.com/graphql/graphql-js/issues/1272
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.mjs', '.gql', '.graphql', '.sql', '.pem'],
  },
  target: "node",
  externals: [nodeExternals()],
  output: {
    libraryTarget: "commonjs",
    path: path.join(process.cwd(), ".webpack"),
    filename: "[name].js"
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
};
