var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

var paths = {
  normalize: 'node_modules/normalize.styl',
  sgrid: 'node_modules/s-grid',
  stylus: 'app/assets/stylus/',
  js: 'app/assets/js/',
};

// Compile stylus to public/css
gulp.task('stylus', function() {
  return gulp.src(paths.stylus+'app.styl')
    .pipe(stylus({
      compress: true,
      include: [paths.normalize, paths.sgrid],
    }))
    .pipe(gulp.dest('public/css'));
});

// Compile js
gulp.task('js', function() {
  return gulp.src(paths.js+'app.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public/js'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.stylus+'**/*.styl', ['stylus']);
  gulp.watch(paths.js+'**/*.js', ['js']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['js', 'stylus', 'watch']);

