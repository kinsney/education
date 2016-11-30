var webpack = require('webpack');
var join = require('path').join;
var dirpath = join(__dirname, '../');

module.exports =
{
    context: dirpath+'home',
    entry:
    {
        app:
        [
            './pageHome.js',
            // './pageVideo.js'
        ],
    },
    output:
    {
        path: dirpath+'dist',
        filename: '[name].js',
        // publicPath:"http://localhost:8000/"
    },
    externals:
    {
        'jquery':'jQuery',
        'react':'React',
        'react-dom':'ReactDom',
        'react-router':'ReactRouter',
        'redux':'Redux',
        'react-redux':'ReactRedux',
        'cropit':'Cropit',
        'waypoints':'Waypoints',
        'moment':'Moment'
    },
    resolve: {extensions: ['', '.js', '.jsx', '.json'] },
    module:
    {
        loaders:
        [
            { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel' },
            { test: /\.json$/, loader: 'json' },
            { test: /\.(png|jpg)$/, loader: 'url' },
            { test: /\.css$/, loaders: ["style", "css?-url"] },
            { test: /\.less$/, loaders: ["style", "css?-ur","less"] },
        ]
    },
    devtool: 'eval',
    devServer:
    {
        contentBase: dirpath+'dist',    // 提供一个服务器服务的文件夹
        inline: true,   // 实施刷新页面
        host: process.env.IP || '0.0.0.0',
        port: process.env.PORT ||8080,
    }
}
