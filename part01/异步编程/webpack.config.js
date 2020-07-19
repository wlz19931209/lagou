const HtmlWebpackPlugin = require('html-webpack-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: 'none',
    stats: 'none',
    devtool: 'sorce-map',
    plugins: [
        new HtmlWebpackPlugin()
    ]
}