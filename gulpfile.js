var gulp = require("gulp");
var less = require("gulp-less");
var concat = require('gulp-concat');
var minify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');

gulp.task('lint', function() {
    return gulp.src('js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('less', function(){
    return gulp.src('css/app.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function() {
    return gulp.src('js/**/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('app.min.js'))
        .pipe(minify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', ['less','scripts'], function(){    
    gulp.watch('js/**/*.js', ['lint', 'scripts']);
    gulp.watch('css/**/*.less', ['less']);
});

gulp.task('default', ['lint', 'less', 'scripts', 'watch']);