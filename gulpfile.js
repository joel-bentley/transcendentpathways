var Gulp = require('gulp');

var Less = require('gulp-less');
var Nodemon = require('gulp-nodemon');

var Clean = require('gulp-clean');
var Path = require('path');
var Merge = require('merge-stream');

var Newer = require('gulp-newer');
var Concat = require('gulp-concat');

var Gutil = require('gulp-util');
var Webpack = require('webpack');


Gulp.task('default', ['watch', 'build', 'nodemon']);    // Build and watch

Gulp.task('build', ['less', 'webpack', 'media']);        // Just build


Gulp.task('clean', function () {
    return Gulp.src('./public/*', { read: false }).pipe(Clean());
});



Gulp.task('less', function () {
    var bundleConfigs = [{
        entries: [
            './views/stylesheets/main.less'
        ],
        dest: './public/css',
        outputName: 'main.min.css'
    }];
    return bundleConfigs.map(function (bundleConfig) {
        return Gulp.src(bundleConfig.entries)
            .pipe(Newer(Path.join(bundleConfig.dest, bundleConfig.outputName)))
            .pipe(Concat(bundleConfig.outputName))
            .pipe(Less({ compress: true }))
            .pipe(Gulp.dest(bundleConfig.dest));
    });
});



Gulp.task('watch', function() {
    global.isWatching = true;
    Gulp.watch('./views/stylesheets/**/*.less', ['less']);
});



Gulp.task('nodemon', function () {
    Nodemon({
        script: 'app.js',
        ext: 'js jsx',
        ignore: [
            'public/**/*'
        ]
    })
        .on('restart', function (files) {

            console.log('change detected:', files);
        });
});



Gulp.task('media', function () {
    var general = Gulp.src('./views/media/**/*')
        .pipe(Gulp.dest(Path.join('./public', 'media')));

    var fonts = Gulp.src('views/fonts/**/*')
        .pipe(Gulp.dest(Path.join('./public', 'fonts')));

    return Merge(general, fonts);
});



var CommonsChunkPlugin = Webpack.optimize.CommonsChunkPlugin;
var UglifyJsPlugin = Webpack.optimize.UglifyJsPlugin;
var executionCount = 0;

Gulp.task('webpack', function (callback) {
    var config = {
        watch: global.isWatching,
        entry: {
            musician: './views/jsx/musician/app',
            facility: './views/jsx/facility/app',
            admin: './views/jsx/admin/app'
        },
        output: {
            path: './public/js',
            filename: '[name].min.js',
            sourceMapFilename: '[name].map.js'
        },
        resolve: {
            extensions: ['', '.js', '.jsx']
        },
        module: {
            loaders: [
                { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader'}
            ]
        },
        devtool: 'source-map',
        plugins: [
            new CommonsChunkPlugin('../core.min.js', undefined, 2),
            new UglifyJsPlugin({ compress: { warnings: false } })
        ]
    };
    Webpack(config, function (err, stats) {

        if (err) {
            throw new Gutil.PluginError('webpack', err);
        }

        Gutil.log('[webpack]', stats.toString({
            colors: true,
            chunkModules: false
        }));

        if (executionCount === 0) {
            callback();
        }
        executionCount += 1;
    });
});









///////////////////////

//var browserify = require('browserify');
//var reactify = require('reactify');
//var source = require('vinyl-source-stream');

/*
gulp.task('js', function(){
    browserify('./views/jsx/app.jsx')
        .transform(reactify)
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('public/js/'));
});
     */