var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var bourbon = require("bourbon").includePaths;
var neat = require("bourbon-neat").includePaths;
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync');
var imagemin = require('gulp-imagemin');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var imageminPngQuant  = require ('imagemin-pngquant');
var cache = require('gulp-cache');

var JS_SOURCE = 'src/js';
var JS_DEST = 'dist/js';
var JS_OUTPUT_FILE = 'main.js';
var CSS_SOURCE = 'src/scss';
var CSS_DEST = 'dist/css';
var IMAGE_SOURCE = 'src/images';
var IMAGE_DEST = 'dist/images';
var SERVER_BASE_DIR = './';
var WATCH_FILE_EXTENSIONS = ['*.html'];

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: SERVER_BASE_DIR
    }
  });
});

gulp.task('bs-reload', function() {
  browserSync.reload();
});

gulp.task('css', function() {
  gulp.src(CSS_SOURCE + '/screen.scss')
    .pipe(plumber({
      errorHandler: function(error) {
        console.log(error.message);
    }}))
    .pipe(sass({
			errLogToConsole: true,
			sourcemaps: true,
      includePaths: [bourbon, neat]
    }))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest(CSS_DEST + '/'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(CSS_DEST + '/'))
    .pipe(browserSync.reload())
});

gulp.task('optimize', function() {
  gulp.src(IMAGE_SOURCE + '/**/*')
    .pipe(imagemin([
      imagemin.gifsicle(),
      imageminJpegRecompress({
        loops:6,
        min: 40,
        max: 85,
        quality:'medium'
      }),
      imageminPngQuant(),
        imagemin.svgo()
      ]))
    .pipe(gulp.dest(IMAGE_DEST + '/'));
});

gulp.task('default', ['browser-sync', 'optimize'], function() {
  gulp.watch(JS_SOURCE + '/**/*.js', ['javascript']);
  gulp.watch(CSS_SOURCE + '/**/*.scss', ['css']);
  gulp.watch(WATCH_FILE_EXTENSIONS, ['bs-reload']);
});
