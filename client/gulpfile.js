var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var eslint = require('gulp-eslint');
var jasmine = require('gulp-jasmine-phantom');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
require('gulp-grunt')(gulp);

var paths = {
  srcHtml: ['*.html','manifest.json'],
  srcJs: ['js/main/*.js','node_modules/idb/lib/idb.js'],
  srcSw: 'js/sw/*.js',
  srcSass: 'sass/**/*.scss',
  srcIcons: 'img-src/icons/*.png',
  destHtml: 'dist',
  destJs: 'dist/js',
  destSw: 'dist',
  destCss: 'dist/css',
  destIcons: 'dist/img/icons'
};

gulp.task('default', ['copy-html', 'copy-js', 'styles'], function () {
  gulp.watch(paths.srcSass, ['styles']);
  gulp.watch(paths.srcHtml, ['copy-html']);
  gulp.watch(paths.srcJs, ['copy-js']);
  gulp.watch(paths.srcSw, ['copy-sw']);
});

gulp.task('dist', [
  'gruntify',
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

gulp.task('gruntify',[
  'grunt-clean',
  'grunt-mkdir',
  'grunt-copy',
  'grunt-responsive_images'
]);

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