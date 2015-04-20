var Gulp = require('gulp');
var babelify = require('babelify');

var Less = require('gulp-less');
var Nodemon = require('gulp-nodemon');

var Clean = require('gulp-clean');
var Path = require('path');
var Merge = require('merge-stream');

var Newer = require('gulp-newer');
var Concat = require('gulp-concat');

var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

Gulp.task('default', ['watch', 'build', 'nodemon']);

Gulp.task('build', ['less', 'jsx', 'media']);

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
            .pipe(Less({ compress: false }))
            .pipe(Gulp.dest(bundleConfig.dest));
    });
});

Gulp.task('watch', function() {
    global.isWatching = true;
    Gulp.watch('./views/stylesheets/**/*.less', ['less']);
    Gulp.watch('./views/javascript/**/*.jsx', ['jsx']);
});

Gulp.task('nodemon', function () {
    Nodemon({
        script: 'app.js',
        ext: 'js jsx',
        ignore: [
            'public/**/*',
            'node_modules/**/*'
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

    var javascript = Gulp.src('views/javascript/lib/*')
        .pipe(Gulp.dest('./public/js/lib'));

    return Merge(general, fonts, javascript);
});


Gulp.task('jsx', ['musicianjs', 'facilityjs', 'adminjs']);

Gulp.task('musicianjs', function(){
    browserify('./views/javascript/musician/App.jsx')
        .transform(reactify)
        .bundle()
        .pipe(source('musician.min.js'))
        .pipe(Gulp.dest('public/js/'));
});

Gulp.task('facilityjs', function(){
    browserify('./views/javascript/facility/App.jsx')
        .transform(reactify)
        .bundle()
        .pipe(source('facility.min.js'))
        .pipe(Gulp.dest('public/js/'));
});

Gulp.task('adminjs', function(){
    browserify('./views/javascript/admin/musician/App.jsx')
        .transform("reactify")
        .bundle()
        .pipe(source('admin.min.js'))
        .pipe(Gulp.dest('public/js/'));
});

