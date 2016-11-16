var webpack = require('webpack');
var join = require('path').join;
var dirpath = join(__dirname, '../');

module.exports = 
{
    context: dirpath+'home',
    entry: 
    {
        vendor: ['./vendor.js'],
    },
    output: 
    {
        path: dirpath+'dist/js',
        filename: '[name].js',
    },
    resolve: {extensions: ['', '.js', '.jsx', '.json'] },
    module: 
    {
        loaders: 
        [
            { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel' },
            { test: /\.json$/, loader: 'json' },
            { test: /\.(png|jpg)$/, loader: 'url?limit=8192' },
            { test: /\.less$/, loaders: ["style", "css?-url", "postcss", "less"] },    
        ]
    },
    postcss: [require('autoprefixer') ],  // 使用postcss时需要的配置
    plugins: 
    [
        new webpack.DefinePlugin({'process.env': {NODE_ENV: '"production"'} }),
        new webpack.optimize.UglifyJsPlugin({compress:{warnings:false },output:{comments:false}})
    ]
}
