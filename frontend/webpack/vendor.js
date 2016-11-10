var webpack = require('webpack')
var join = require('path').join

module.exports = 
{
    context: join(__dirname, 'src'),
    entry: ['react', 'react-dom', 'react-router', 'redux', 'react-redux', 'moment', 'cropit'],
    output: 
    {
        path: join(__dirname, 'dist'),
        filename: 'vendor.js'
    },
    resolve: {extensions: ['', '.js', '.jsx', '.json'] },
    module: 
    {
        loaders: 
        [
            { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel' },
            { test: /\.json$/, loader: 'json' },
            { test: /\.(png|jpg)$/, loader: 'url' },
            { test: /\.less$/, loaders: ["style", "css", "less"] },
        ]
    },
    plugins: 
    [
        new webpack.DefinePlugin({'process.env': {NODE_ENV: '"production"'} }),
        new webpack.optimize.UglifyJsPlugin({compress:{warnings:false },output:{comments:false}})
    ]
}
