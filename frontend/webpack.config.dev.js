const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    devtool: "cheap-eval-source-map",
    entry: [
        "react-hot-loader/patch",
        "webpack-dev-server/client?http://localhost:8080",
        "./src/index.js"
    ],
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ],
    module: {
        loaders: [{
            test: /\.css$/,
            loaders: ["style-loader", "css-loader"]
        }, {
            test: /\.html$/,
            loaders: ["raw-loader"]
        }, {
            test: /\.js$/,
            loaders: ["babel-loader"],
            include: path.join(__dirname, "src")
        }, {
            test: /\.jsx$/,
            loaders: ["babel-loader"],
            include: path.join(__dirname, "src")
        }, {
            test: /\.json$/,
            loaders: ["json-loader"]
        }]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    devServer: {
        contentBase: "./dist",
        hot: true
    }
}
