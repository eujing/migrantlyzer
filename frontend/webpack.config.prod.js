var path = require("path")
var webpack = require("webpack")
var HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    devtool: "source-map",
    entry: ["./src/index.js"],
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js"
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
            },
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        },
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        }))
    ],
    module: {
        loaders: [{
            test: /\.css$/,
            loaders: ["style-loader", "css-loader"]
        }, {
            test: /\.js$/,
            loaders: ["babel-loader"]
            include: path.join(__dirname, "src")
        }]
    }
}