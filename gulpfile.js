var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var eslint = require('gulp-eslint');
var jasmine = require('gulp-jasmine-phantom');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var paths = {
  srcHtml: 'client/*.html',
  srcJs: 'client/js/main/*.js',
  srcSw: '',
  srcSass: '',
  destHtml: 'client/dist',
  destJs: 'client/dist/js',
  destSw: 'client/dist',
  destCss: 'client/css'
};

gulp.task('default', ['copy-html', 'copy-images', 'styles', 'lint'], function () {
  gulp.watch(paths.srcSass, ['styles']);
  gulp.watch(paths.srcHtml, ['copy-html']);
  gulp.watch(paths.srcJs, ['copy-js']);
  gulp.watch(paths.srcSw, ['copy-sw']);
});

gulp.task('dist', [
  'copy-html',
  'copy-js',
  'copy-sw',
  'styles'
]);

gulp.task('copy-html', function () {
  gulp.src(paths.srcHtml)
    .pipe(gulp.dest(paths.destHtml));
});

gulp.task('copy-js', function () {
  gulp.src(paths.srcJs)
    .pipe(gulp.dest(paths.destJs));
});

gulp.task('copy-sw', function () {
  gulp.src(paths.srcSw)
    .pipe(gulp.dest(paths.destSw));
});

gulp.task('styles', function () {
  gulp.src(paths.srcSass)
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest(paths.destCss));
  /* .pipe(browserSync.stream()); */
});

gulp.task('lint', function () {
  return gulp.src([paths.srcJs, paths.srcSw])
    // eslint() attaches the lint output to the eslint property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failOnError last.
    .pipe(eslint.failOnError());
});