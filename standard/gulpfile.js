var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'); 

var paths = {
  stylus: ['app/assets/stylus/**/*.styl'],
  js: ['app/assets/js/**/*.js'],
};

// Compile stylus to public/css
gulp.task('stylus', function() {
  return gulp.src(paths.stylus)
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest('public/css'));
});

// Compile js
gulp.task('js', function() {
  return gulp.src(paths.js)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public/js'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.stylus, ['stylus']);
  gulp.watch(paths.js, ['js']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['stylus', 'watch']);

