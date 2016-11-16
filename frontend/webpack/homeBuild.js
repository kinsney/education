var webpack = require('webpack');
var join = require('path').join;
var dirpath = join(__dirname, '../');

module.exports = 
{
    context: dirpath+'home',
    entry: 
    {
        app: ['./homePage.js'],
    },
    output: 
    {
        path: dirpath+'dist',
        filename: '[name].js',
        // publicPath:"http://localhost:8000/"
    },
    // 当希望以<script>的形式挂载到页面上来加载某些js库，但又希望能在 webpack 的模块中使用上,可以使用 externals 属性：
    // external: ['react', 'react-dom', 'react-router', 'redux', 'react-redux', 'moment', 'cropit'],
    resolve: {extensions: ['', '.js', '.jsx', '.json'] },
    module: 
    {
        loaders: 
        [
            { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel' },
            { test: /\.json$/, loader: 'json' },
            { test: /\.(png|jpg)$/, loader: 'url' },
            { test: /\.less$/, loaders: ["style", "css", "postcss", "less"] },    
        ]
    },
    postcss: [require('autoprefixer') ],  // 使用postcss时需要的配置
    plugins: 
    [
        new webpack.DefinePlugin({'process.env': {NODE_ENV: '"production"'} }),
        new webpack.optimize.UglifyJsPlugin({compress:{warnings:false },output:{comments:false}})
    ]
}
