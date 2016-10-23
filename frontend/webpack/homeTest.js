var webpack = require('webpack');
var join = require('path').join;
var dirpath = join(__dirname, '../');

module.exports = 
{
    context: dirpath+'home',
    entry: 
    {
        app: ['./index.js'],
    },
    output: 
    {
        path: dirpath+'dist',
        filename: '[name].js',
        // publicPath:"http://localhost:8000/"
    },
    // 当希望以<script>的形式挂载到页面上来加载某些js库，但又希望能在 webpack 的模块中使用上,可以使用 externals 属性：
    external: ['react', 'react-dom', 'react-router', 'redux', 'react-redux', 'moment', 'cropit'],
    resolve: {extensions: ['', '.js', 'jsx', '.json'] },
    module: 
    {
        loaders: 
        [
            { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel' },
            { test: /\.json$/, loader: 'json' },
            { test: /\.(png|jpg)$/, loader: 'url' },
            { test: /\.less$/, loaders: ["style", "css","less"] },    
        ]
    },
    devtool: 'eval',
    devServer: 
    {
        contentBase: dirpath+'dist',    // 提供一个服务器服务的文件夹
        inline: true,   // 实施刷新页面
        host: process.env.IP || '0.0.0.0',
        port: process.env.PORT || 8080,
    }
}
