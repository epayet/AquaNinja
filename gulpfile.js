var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require("gulp-rename");
var concat = require('gulp-concat');
var connect = require('gulp-connect');

gulp.task("default", ["build", "watch", "server"]);
gulp.task("build", ["scripts", "libs"]);

var port = 8000;

gulp.task('scripts', function() {
    // Single entry point to browserify
    return gulp.src('js/app.js')
        .pipe(rename("app.min.js"))
        .pipe(browserify({
            insertGlobals : true,
            debug : true
        }))
        .pipe(gulp.dest('dist'))
});

gulp.task('libs', function() {
    // Single entry point to browserify
    return gulp.src(['libs/three.js', 'libs/**/**'])
        .pipe(rename("app.min.js"))
        .pipe(concat('libs.min.js'))
        .pipe(gulp.dest('dist'))
});

gulp.task("server", function() {
    return connect.server({
        livereload: true,
        port: port
    });
});

gulp.task("watch", function() {
    return gulp.watch("js/**", ["scripts"]);
});