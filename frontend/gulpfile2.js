'use strict';

var gulp = require('gulp');
var webpack = require('webpack');
var webpackServe = require('webpack-dev-server');

var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

var imageop = require('gulp-image-optimization');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var fs = require('fs');
var glob = require('glob');
var del = require('del');


gulp.task("localserver", function(callback) 
{
    var config = require('./webpack/localTest.js');
    var compiler = webpack(config);
});




