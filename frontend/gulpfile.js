'use strict';

var gulp = require('gulp');

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

var misago = '../misago/static/misago/';


/*———————————————————动态构建顶层API—————————————————*/
gulp.task('watch', ['watchifybuild'], function() {
    gulp.watch('style/**/*.less', ['faststyle']);
});

gulp.task('watchstyle', ['faststyle', 'faststatic'], function() {
    gulp.watch('style/**/*.less', ['faststyle']);
});



/**-------------------------------------------------------------------------------
 * 快速构建和压缩构建所有资源
 *------------------------------------------------------------------------------*/
gulp.task('build', ['source', 'style', 'static', 'vendorsources', 'copyzxcvbn']);
gulp.task('fastbuild', ['fastsource','faststyle','faststatic','fastvendorsources','copyzxcvbn']);
gulp.task('watchifybuild', ['fastbuild'], function() {
    var b = browserify({
            entries: getSources(),
            debug: true,
            cache: {},
            packageCache: {}
        })
        .plugin(watchify, {
            delay: 100,
            poll: true
        })
        .external('moment')
        .external('cropit')
        .external('react')
        .external('react-dom')
        .external('react-router')
        .external('redux')
        .external('react-redux')
        .transform(babelify)
        .on('error', function(err) {
            // print the error (can replace with gulp-util)
            console.log(err.message);
            // end this stream
            this.emit('end');
        });

    function bundle() { b.bundle().pipe(fs.createWriteStream(misago + 'js/misago.js')); }

    b.on('update', bundle);
    bundle();

    b.on('log', function(msg) { gutil.log(gutil.colors.cyan('watchify:'), msg); });
})


/**-------------------------------------------------------------------------------
 * 辅助函数：获取glob及语法检查
 *------------------------------------------------------------------------------*/
// 获取index.js及initializers下所有文件glob
function getSources() 
{
    var sources = ['src/index.js'];

    function include(pattern) 
    {
        var paths = glob.sync(pattern);
        paths.forEach(function(path) {sources.push(path);});
    };

    include('src/initializers/*.js');
    include('src/initializers/**/*.js');

    return sources.map(function(path) { return path; });
};
// js语法检查
gulp.task('lintsource', function() {
    return gulp.src('src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


/**-------------------------------------------------------------------------------
 * 打包处理主js文件：index
 *------------------------------------------------------------------------------*/

// (不压缩)打包index-->misaga.js
gulp.task('fastsource', ['lintsource'], function() {
    return browserify({
            entries: getSources(),
            debug: true,
        })
        .external('moment')
        .external('cropit')
        .external('react')
        .external('react-dom')
        .external('react-router')
        .external('redux')
        .external('react-redux')
        .transform(babelify)
        .bundle()
        .pipe(source('misago.js'))
        .pipe(buffer())
        .pipe(gulp.dest(misago + 'js'));
});

// (压缩)打包index-->misaga.js
gulp.task('source', ['lintsource'], function() {
    process.env.NODE_ENV = 'production';

    return browserify({
            entries: getSources(),
            debug: false
        })
        .external('moment')
        .external('cropit')
        .external('react')
        .external('react-dom')
        .external('react-router')
        .external('redux')
        .external('react-redux')
        .transform(babelify)
        .bundle()
        .pipe(source('misago.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(misago + 'js'));
});





/**-------------------------------------------------------------------------------
 * 处理less到CSS
 *------------------------------------------------------------------------------*/

// 删除生成的CSS
gulp.task('cleanstyle', function(cb) { del(misago + 'css', cb); });

// (不压缩)打包CSS
gulp.task('faststyle', function() 
{
    return gulp.src('style/index.less')
        .pipe(less())
        .pipe(rename('misago.css'))
        .pipe(gulp.dest(misago + 'css'));
});
// (压缩)打包CSS
gulp.task('style', function() 
{
    return gulp.src('style/index.less')
        .pipe(less())
        .pipe(minify())
        .pipe(rename('misago.css'))
        .pipe(gulp.dest(misago + 'css'));
});


/**-------------------------------------------------------------------------------
 * 处理静态资源
 *------------------------------------------------------------------------------*/
// 拷贝字体
gulp.task('copyfonts', function(cb) 
{
    return gulp.src('static/fonts/**/*')
        .pipe(gulp.dest(misago + 'fonts'));
});
// (不压缩)拷贝图像
gulp.task('fastcopyimages', function() 
{
    return gulp.src('static/img/**/*')
        .pipe(gulp.dest(misago + 'img'));
});
// (压缩)拷贝图像
gulp.task('copyimages', function() 
{
    return gulp.src('static/img/**/*')
        .pipe(imageop({
            optimizationLevel: 9
        }))
        .pipe(gulp.dest(misago + 'img'));
});

// (不压图)拷贝静态资源
gulp.task('faststatic', ['copyfonts', 'fastcopyimages']);
// (压图)拷贝静态资源
gulp.task('static', ['copyfonts', 'copyimages']);


/**-------------------------------------------------------------------------------
 * 打包处理辅js文件：vendor及zxcvb
 *------------------------------------------------------------------------------*/

// (不压缩)verndor-->vendor.js
gulp.task('fastvendorsources', function() 
{
    return browserify({
            entries: 'src/vendor.js',
            debug: true
        })
        .transform('browserify-shim')
        .require('moment')
        .require('cropit')
        .require('react')
        .require('react-dom')
        .require('react-router')
        .require('redux')
        .require('react-redux')
        .bundle()
        .pipe(source('vendor.js'))
        .pipe(buffer())
        .pipe(gulp.dest(misago + 'js'));
});
// (压缩)verndor-->vendor.js
gulp.task('vendorsources', function() 
{
    process.env.NODE_ENV = 'production';

    return browserify({
            entries: 'src/vendor.js',
            debug: false
        })
        .transform('browserify-shim')
        .require('moment')
        .require('cropit')
        .require('react')
        .require('react-dom')
        .require('react-router')
        .require('redux')
        .require('react-redux')
        .transform(babelify)
        .bundle()
        .pipe(source('vendor.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(misago + 'js'));
});
// 拷贝zxcvbn
gulp.task('copyzxcvbn', function() 
{
    return gulp.src('node_modules/zxcvbn/dist/*')
        .pipe(gulp.dest(misago + 'js'));
});




/**-------------------------------------------------------------------------------
 * 测试任务相关设置
 *------------------------------------------------------------------------------*/

var tests = (function() 
{
    var flag = process.argv.indexOf('--limit');
    var value = process.argv[flag + 1];

    var tests = ['src/test-setup.js'];
    if (flag !== -1 && value) 
    {
        var pattern = value.trim();
        glob.sync('tests/**/*.js').map(function(path) 
        {
            if (path.indexOf(pattern) !== -1) {tests.push(path);}
        });
    } 
    else 
    {
        tests.push('tests/**/*.js');
    }

    return tests;
})();

gulp.task('linttests', function() 
{
    return gulp.src(tests)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('test', ['linttests', 'lintsource'], function() 
{
    var mochify = require('mochify');

    mochify(tests.join(" "), {reporter: 'spec'})
        .transform(babelify)
        .bundle();
});