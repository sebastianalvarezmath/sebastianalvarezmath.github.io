var gulp = require('gulp');
var minifyCSS = require('gulp-csso');
var compileSass = require('gulp-sass');
var minifyJS = require('gulp-minify');
var minifyHTML = require('gulp-htmlmin');
var webServer = require('gulp-server-livereload');
const watch = require("gulp-watch");


/////////////////////////////
// SOURCES
/////////////////////////////

gulp.task('sass', function () {
    return gulp.src('./app/source/**/*.scss')
        .pipe(compileSass.sync().on('error', compileSass.logError))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./app/build/'));
});

gulp.task('compressJS', function() {
    return gulp.src('./app/source/**/*.js')
        .pipe(minifyJS())
        .pipe(gulp.dest('./app/build/'))
});

gulp.task('minifyHTML', function() {
    return gulp.src('./app/source/**/*.html')
        .pipe(minifyHTML({collapseWhitespace: true}))
        .pipe(gulp.dest('./app/build/'));
});
gulp.task('static', function() {
    return gulp.src('./app/source/static/**/*')
        .pipe(gulp.dest('./app/build/static'));
});


/////////////////////////////
// WATCHES
/////////////////////////////

gulp.task('compressJSWatch', function() {
    return watch('./app/source/**/*.js')
        .pipe(minifyJS())
        .pipe(gulp.dest('./app/build/'))
});

gulp.task('minifyHTMLWatch', function() {
    return watch('./app/source/**/*.html')
        .pipe(minifyHTML({collapseWhitespace: true}))
        .pipe(gulp.dest('./app/build/'));
});
gulp.task('sassWatch', function () {
    gulp.watch('./app/source/**/*.scss', ['sass']);
});
gulp.task('staticWatch', function() {
    return watch('./app/source/static/**/*')
        .pipe(gulp.dest('./app/build/static'));
});
/////////////////////////////
// SERVER
/////////////////////////////

gulp.task('createServer', function() {
    gulp.src('./app/build')
        .pipe(webServer({
            livereload: true,
            open: true,
            port: 8000,
            log: 'debug'
        }));
});

gulp.task('default', ['sass', 'sassWatch', 'static', 'staticWatch',
    'compressJSWatch', 'minifyHTMLWatch',
    'compressJS', 'minifyHTML',
    'createServer']);
