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
        path: dirpath+'../misago/static/misago/',
        filename: 'misago.js',
    },
    // 当希望以<script>的形式挂载到页面上来加载某些js库，但又希望能在webpack的模块中使用上,可以使用externals属性：
    external: ['react', 'react-dom', 'react-router', 'redux', 'react-redux', 'moment', 'cropit'],
    resolve: {extensions: ['', '.js', '.jsx', '.json'] },
    module: 
    {
        loaders: 
        [
            { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel' },
            { test: /\.json$/, loader: 'json' },
            { test: /\.(png|jpg)$/, loader: 'url' },
            // 如果使用css modules需要设置 "css?modules"
            // postcss可以为css自动加前缀，但是需要：npm install postcss-loader autoprefixer --save-dev
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
