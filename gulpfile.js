const gulp = require('gulp');
const jasmine = require('gulp-jasmine');

const src = ['./tests/**/*.spec.js', './src/**/*.js'];

gulp.task('default', ['test', 'watch']);

gulp.task('test', () =>
  gulp.src(src)
    .pipe(jasmine())
);

gulp.task('watch', () => {
  gulp.watch(src, ['test']);
});
