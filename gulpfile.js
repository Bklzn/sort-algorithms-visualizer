const gulp = require('gulp');
const ts = require('gulp-typescript');
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'))

const tsProject = ts.createProject('tsconfig.json');

gulp.task('clear', async function () {
  const del = (await import('del')).deleteAsync
  return del('dist/**', { force: true });
});
gulp.task('html', function () {
    return gulp.src('src/**/*.html')
      .pipe(gulp.dest('dist'))
    })
gulp.task('sass', function () {
    return gulp.src('src/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist'))
})
gulp.task('compile-ts', function () {
  return gulp.src('src/**/*.ts')
    .pipe(tsProject())
    .pipe(gulp.dest('dist'))
})

gulp.task('watch', function () {
  gulp.watch('src/**/*.html', gulp.series('html'));
  gulp.watch('src/**/*.sass', gulp.series('sass'));
  gulp.watch('src/**/*.ts', gulp.series('compile-ts'));
})

gulp.task('default', gulp.series('compile-ts', 'watch'));

exports.build = gulp.series('clear','html','sass','compile-ts')
exports.dev = gulp.series('clear', 'html','sass','compile-ts', 'watch')