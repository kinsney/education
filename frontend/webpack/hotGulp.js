var webpack = require('webpack');
var join = require('path').join;
var dirpath = join(__dirname, '../');

module.exports = 
{
    context: dirpath+'home',
    entry: { },
    output: 
    {
        path: dirpath+'dist/js',
        filename: '[name].js',
    },
    externals: 
    {
        'jquery':'Jquery',
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
            { test: /\.(js|jsx)$/, exclude: /node_modules/, loaders: ['babel'] },
            { test: /\.json$/, loader: 'json' },
            { test: /\.(png|jpg)$/, loader: 'url' },
            { test: /\.css$/, loaders: ["style", "css"] },
            { test: /\.less$/, loaders: ["style", "css","less"] },
        ]
    },
    plugins: [ new webpack.HotModuleReplacementPlugin(),/* new webpack.NoErrorsPlugin() */]
}