var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var bourbon = require("bourbon").includePaths;
var neat = require("bourbon-neat").includePaths;
var sass = require('gulp-sass');
var gzip = require('gulp-gzip');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync');
var imagemin = require('gulp-imagemin');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var imageminPngQuant  = require ('imagemin-pngquant');
var imgRetina = require('gulp-responsive-imgz');

var SOURCE = './src/';
var DEST = './dist/';
var JS_OUTPUT_FILE = 'main.js';

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: DEST
    },
    // tunnel: 'paysdev',
    online: true
  });
});

gulp.task('bs-reload', function() {
  browserSync.reload();
});

gulp.task('build-css', function() {
  gulp.src(SOURCE + 'scss/screen.scss')
		.pipe(sourcemaps.init())
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
		.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(DEST + 'css/'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(DEST + 'css/'));
});

gulp.task('build-js', function() {
	gulp.src(SOURCE + 'js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat(JS_OUTPUT_FILE))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DEST + 'js/'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
    .pipe(gulp.dest(DEST + 'js/'))
	  .pipe(gzip())
    .pipe(gulp.dest(DEST + 'js/'))
});

gulp.task('optimize-images', function() {
  gulp.src(SOURCE + 'images/**/*')
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
    .pipe(gulp.dest(DEST + 'images/'));
});

gulp.task('include-retina', function() {
  return gulp.src(SOURCE + '*.html')
    // .pipe(imgRetina())
    .pipe(gulp.dest(DEST));
});

gulp.task('vendorStyles', function () {
  return gulp.src(SOURCE + 'vendor/**/*.css')
  	.pipe(concat('vendor.css'))
	  .pipe(gulp.dest(DEST + 'vendor/'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(DEST + 'vendor/'));
});

gulp.task('vendorJs', function() {
	return gulp.src(SOURCE + 'vendor/**/*.js')
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest(DEST + 'vendor/'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest(DEST + 'vendor/'))
	  .pipe(gzip())
		.pipe(gulp.dest(DEST + 'vendor/'))
});

gulp.task('default', ['build-css', 'build-js', 'vendorStyles', 'vendorJs', 'optimize-images', 'include-retina', 'browser-sync'], function() {
  gulp.watch(SOURCE + 'js/**/*.js', ['build-js', browserSync.reload]);
  gulp.watch(SOURCE + 'scss/*.scss', ['build-css', browserSync.reload]);
  gulp.watch(SOURCE + 'scss/**/*.scss', ['build-css', browserSync.reload]);
  gulp.watch(SOURCE + '*.html', ['include-retina', browserSync.reload]);
  gulp.watch(SOURCE + 'images/**/*.*', ['optimize-images', 'include-retina', browserSync.reload]);
});
