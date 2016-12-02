var webpack = require('webpack');
var join = require('path').join;
var dirpath = join(__dirname, '../');

module.exports = 
{
    context: dirpath+'home',
    entry: { },
    output: 
    {
        path: dirpath+'../home/static/js',
        filename: '[name].js',
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
            { test: /\.(swf|ttf|eot|svg|woff(2))(\?[a-z0-9]+)?$/, loader: 'file' },
            { test: /\.(png|jpg)$/, loader: 'url' },
            { test: /\.css$/, loaders: ["style", "css?-url", "postcss"] },
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
