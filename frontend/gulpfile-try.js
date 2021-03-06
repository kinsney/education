'use strict';

var gulp = require('gulp');
var webpack = require('webpack');
var webpackServe = require('webpack-dev-server');
var gutil = require('gulp-util');


var fs = require('fs');
var glob = require('glob');
var del = require('del');



gulp.task("build", function(callback) 
{
	var buildConfig = require('./webpack/buildGulp.js');
	var compiler = webpack(buildConfig);

    compiler.run(function(err, stats)
    {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString(
        {
            colors: true
        }));
        callback();
    });

    var watchOption = 
    {
    	aggregateTimeout: 300, // wait so long for more changes
    	poll: true // use polling instead of native watchers
    };
    // compiler.watch(watchOption,function(err, stats){});
})



gulp.task("hot", function(callback) 
{
	var port = 8080;
	var host = "0.0.0.0";

    var hotConfig = require('./webpack/hotGulp.js');
    hotConfig.entry = {
    	app:[
    		"webpack-dev-server/client?http://localhost:"+port+"/",
    		"webpack/hot/dev-server",
    		'./pageHome.js'
    	]
    };
    hotConfig.output.publicPath = "http://localhost:"+port+"/assets/";
    hotConfig.devtool = "eval";
    hotConfig.debug = true;

    var compiler = webpack(hotConfig);
    var devOption = 
    {
    	contentBase: './dist',
        hot: true,
        historyApiFallback: true,
        stats: { colors: true }
    };

    var devCompiler = new webpackServe(compiler,devOption);
    devCompiler.listen(port, host, function(err) 
    {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:"+port+"/webpack-dev-server/index.html");

        // keep the server alive or continue?
        // callback();
    });
});

gulp.task("test", function(callback){

    var args = process.argv;
    console.log(args);
});



