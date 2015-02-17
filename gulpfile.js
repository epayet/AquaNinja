var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require("gulp-rename");
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

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
    return gulp.src(['libs/three.min.js', 'libs/**/**'])
        .pipe(rename("app.min.js"))
        .pipe(concat('libs.min.js'))
        .pipe(gulp.dest('dist'))
});

gulp.task("server", function() {
    return browserSync({
        notify: false,
        server: {
            baseDir: ['.']
        },
        port: port
    });
});

gulp.task("watch", function() {
    return gulp.watch("js/**", ["scripts", reload]);
});