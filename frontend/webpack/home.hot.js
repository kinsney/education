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
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',
            './index.js'
        ]
    },
    output: 
    {
        path: dirpath+'dist',
        filename: 'app.js',
        publicPath:"http://localhost:8080/"
    },
    // 当希望以<script>的形式挂载到页面上来加载某些js库，但又希望能在 webpack 的模块中使用上,可以使用 externals 属性：
    // external: ['react', 'react-dom', 'react-router', 'redux', 'react-redux', 'moment', 'cropit'],
    resolve: {extensions: ['', '.js', '.jsx', '.json'] },
    module: 
    {
        loaders: 
        [
            { test: /\.(js|jsx)$/, exclude: /node_modules/, loaders: ['babel'] },
            { test: /\.json$/, loader: 'json' },
            { test: /\.(png|jpg)$/, loader: 'url' },
            { test: /\.css$/, loaders: ["style", "css"] },
            { test: /\.less$/, loaders: ["style", "css","less"] },
        ]
    },
    plugins: [ new webpack.HotModuleReplacementPlugin(),/* new webpack.NoErrorsPlugin() */],
    devtool: 'eval',
    devServer: 
    {
        contentBase: dirpath+'dist',    // 提供一个服务器服务的文件夹
        hot: true,
        host: process.env.IP || '0.0.0.0',
        port: 8080,
        historyApiFallback: true
    }
}


/*
React Hot Loader: The Webpack loader is now exported separately. 

If you use Babel, we recommend that you remove "react-hot-loader" from the "loaders" section of your Webpack configuration altogether, and instead add "react-hot-loader/babel" to the "plugins" section of your .babelrc 

file. If you prefer not to use Babel, replace "react-hot-loader" or "react-hot" with "react-hot-loader/webpack" in the "loaders" section of your Webpack configuration.
*/
