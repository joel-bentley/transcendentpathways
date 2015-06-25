var Gulp = require('gulp');

var Less = require('gulp-less');
var Nodemon = require('gulp-nodemon');

var Clean = require('gulp-clean');
var Path = require('path');
var Merge = require('merge-stream');

var Newer = require('gulp-newer');
var Concat = require('gulp-concat');

var browserify = require('browserify');
//var reactify = require('reactify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

//var mainBowerFiles = require('main-bower-files');



Gulp.task('default', ['watch', 'build', 'nodemon']);

Gulp.task('build', ['less', 'jsx', 'media']);

Gulp.task('clean', function () {
    return Gulp.src('./public/*', { read: false }).pipe(Clean());
});

Gulp.task('less', function () {
    var bundleConfigs = [{
        entries: [
            './views/stylesheets/main.less',
            './views/stylesheets/musicianAdmin.css',
            './views/stylesheets/bootstrap.css'


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
            'node_modules/**/*',
            'views/javascript/lib/**/*'
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

    var javascript = Gulp.src('views/javascript/lib/**/*')
        .pipe(Gulp.dest('./public/js/lib'));

    return Merge(general, fonts, javascript);
});

//Gulp.task('bowerfiles', function() {
//   return Gulp.src(mainBowerFiles()).pipe(Gulp.dest('./public/js/lib'))
//});


//Gulp.task('jsx', ['musicianjs', 'facilityjs', 'adminjs']);
Gulp.task('jsx', ['adminjs', 'musicianjs', 'adminFacilityjs', 'adminNotes', 'adminEvents']);


Gulp.task('musicianjs', function(){
    browserify('./views/javascript/musician/MusicianTable.jsx')
        .transform(babelify)
        .bundle()
        .pipe(source('musician.min.js'))
        .pipe(Gulp.dest('public/js/'));
});
//
//Gulp.task('facilityjs', function(){
//    browserify('./views/javascript/facility/Notes.jsx')
//        .transform(babelify)
//        .bundle()
//        .pipe(source('facility.min.js'))
//        .pipe(Gulp.dest('public/js/'));
//});

Gulp.task('adminFacilityjs', function(){
    browserify('./views/javascript/admin/facility/FacilityTable.jsx')
        .transform(babelify)
        .bundle()
        .pipe(source('adminFacility.min.js'))
        .pipe(Gulp.dest('public/js/'));
});

Gulp.task('adminjs', function(){
    browserify('./views/javascript/admin/musician/MusicianTable.jsx')
        .transform(babelify)
        .bundle()
        .pipe(source('admin.min.js'))
        .pipe(Gulp.dest('public/js/'));
});

Gulp.task('adminNotes', function(){
    browserify('./views/javascript/admin/notes/ListContainer.jsx')
        .transform(babelify)
        .bundle()
        .pipe(source('notes.min.js'))
        .pipe(Gulp.dest('public/js/'));
});
Gulp.task('adminEvents', function(){
    browserify('./views/javascript/admin/event/EventContainer.jsx')
        .transform(babelify)
        .bundle()
        .pipe(source('adminEvent.min.js'))
        .pipe(Gulp.dest('public/js/'));
});