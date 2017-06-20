var gulp = require('gulp');
var stylus = require('gulp-stylus');

var paths = {
  stylus: ['app/assets/stylus/**/*.styl'],
};

gulp.task('stylus', function() {
  return gulp.src(paths.stylus)
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest('public/css'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.stylus, ['stylus']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['stylus', 'watch']);

