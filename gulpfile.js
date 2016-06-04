const gulp = require('gulp');
const jasmine = require('gulp-jasmine');

const src = ['tests/**/*.spec.js', 'index.js'];

gulp.task('default', ['watch']);

gulp.task('test', () =>
  gulp.src(src)
    .pipe(jasmine())
);

gulp.task('watch', () => {
  gulp.watch(src, ['test']);
});
