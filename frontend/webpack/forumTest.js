var webpack = require('webpack');
var join = require('path').join;
var glob = require('glob');
var dirpath = join(__dirname, '../');

var entryPoints = (function() 
{
    var sources = [dirpath+'forum/src/index.js'];
    function include(pattern) 
    {
        var paths = glob.sync(pattern);
        paths.forEach(function(path) {sources.push(path);});
    };

    include(dirpath+'forum/src/initializers/*.js');
    include(dirpath+'forum/src/initializers/**/*.js');

    return sources.map(function(path) { return path; });
})();

module.exports = 
{
    context: dirpath+'forum',
    entry: entryPoints,
    output: 
    {
        path: dirpath+'dist',
        filename: 'misago.js',
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
    // webpack-dev-server 的打包结果是放在内存的，查看 dist/misago.js的内容实际上是没有改变的
    devServer: 
    {
        contentBase: dirpath+'dist',    // 提供一个服务器服务的文件夹
        inline: true,   // 实施刷新页面
        stats: { colors: true },    // 终端打印输出彩色
        host: process.env.IP || '0.0.0.0',
        port: process.env.PORT || 8080
    }
}
