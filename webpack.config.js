const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const WebpackShellPluginNext = require("webpack-shell-plugin-next");
const dotEnv = require("dotenv");

dotEnv.config();
const {
  NODE_ENV = "production",
  APP_NAME = "index"
} = process.env;

module.exports = {
  entry: "./src/index.js",
  mode: NODE_ENV,
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: (NODE_ENV === "development" && "index" || APP_NAME ) + ".js"
  },
  resolve: {
    extensions: ["js"]
  },
  externals: [nodeExternals()],
  watch: NODE_ENV === "development",
  watchOptions: {
    ignored: [ "node_modules/**" ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackShellPluginNext({
          onBuildEnd: {
            scripts: ["npm run run:dev"],
            blocking: false,
            parallel: true
          }
    })
  ]
};
