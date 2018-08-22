var gulp = require('gulp');
var plumber = require('gulp-plumber');
// var rename = require('gulp-rename');
var bourbon = require("bourbon").includePaths;
var neat = require("bourbon-neat").includePaths;
var sass = require('gulp-sass');
// var autoprefixer = require('gulp-autoprefixer');
// var concatCss = require('gulp-concat-css');
// var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync');
// var minifyImage = require('gulp-imagemin');
// var cache = require('gulp-cache');
// var neat = require('node-neat');

var JS_SOURCE = 'src/js';
var JS_DEST = 'dist/js';
var JS_OUTPUT_FILE = 'main.js';
var CSS_SOURCE = 'src/css';
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
  gulp.src(CSS_SOURCE + '/**/*.scss')
    .pipe(plumber({
      errorHandler: function(error) {
        console.log(error.message);
        // generator.emit('end');
    }}))
    .pipe(sass({
			errLogToConsole: true,
			sourcemaps: true,
      includePaths: [bourbon, neat]
    }))
    // .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest(CSS_DEST + '/'))
    // .pipe(rename({suffix: '.min'}))
    // .pipe(cleanCSS({compatibility: 'ie8'}))
    // .pipe(gulp.dest(CSS_DEST + '/'))
    .pipe(browserSync.reload({ stream:true }))
});

// gulp.task('images', function() {
//   gulp.src(IMAGE_SOURCE + '/**/*')
//     .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
//     .pipe(gulp.dest(IMAGE_DEST + '/'));
// });

gulp.task('default', ['browser-sync'], function() {
  gulp.watch(JS_SOURCE + '/**/*.js', ['javascript']);
  gulp.watch(CSS_SOURCE + '/**/*.scss', ['css']);
  gulp.watch(WATCH_FILE_EXTENSIONS, ['bs-reload']);
});
