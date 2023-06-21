const gulp = require('gulp');
const ts = require('gulp-typescript');
const concat = require('gulp-concat');

const tsProject = ts.createProject('tsconfig.json');

gulp.task('html', function () {
    return gulp.src('src/**/*.html')
      .pipe(gulp.dest('dist'))
    })
gulp.task('css', function () {
    return gulp.src('src/**/*.css')
        .pipe(concat('main.css'))
        .pipe(gulp.dest('dist'))
})
gulp.task('compile-ts', function () {
  return gulp.src('src/**/*.ts')
    .pipe(tsProject())
    .pipe(gulp.dest('dist'))
})

gulp.task('watch', function () {
  gulp.watch('src/**/*.html', gulp.series('html'));
  gulp.watch('src/**/*.css', gulp.series('css'));
  gulp.watch('src/**/*.ts', gulp.series('compile-ts'));
})

gulp.task('default', gulp.series('compile-ts', 'watch'));

exports.build = gulp.series('html','css','compile-ts')
exports.dev = gulp.series('html','css','compile-ts', 'watch')