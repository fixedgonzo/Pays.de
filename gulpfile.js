var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var bourbon = require("bourbon").includePaths;
var neat = require("bourbon-neat").includePaths;
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync');
var imagemin = require('gulp-imagemin');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var imageminPngQuant  = require ('imagemin-pngquant');
var imgRetina = require('gulp-responsive-imgz');
var cache = require('gulp-cache');

var SOURCE = 'src/';
var DEST = 'dist/';
var JS_OUTPUT_FILE = 'main.js';
var WATCH_FILE_EXTENSIONS = ['*.html', '*.css', '*.js'];

gulp.task('browser-sync', function() {
	console.log('reload');
  browserSync({
    server: {
      baseDir: DEST
    }
  });
});

gulp.task('bs-reload', function() {
  browserSync.reload();
});

gulp.task('css', function() {
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
    .pipe(gulp.dest(DEST + 'css/'))
    .pipe(browserSync.reload())
		// .pipe(browserSync.reload({
    //   stream: true
    // }))
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

gulp.task('include-retina', function() {0
  return gulp.src(SOURCE + '*.html')
    .pipe(imgRetina())
    .on('error', function(e) {
      console.log(e.message);
    })
    .pipe(gulp.dest(DEST));
});

gulp.task('default', ['browser-sync', 'css', 'optimize-images', 'include-retina'], function() {
  gulp.watch(SOURCE + 'js/**/*.js', ['javascript']);
  // gulp.watch(SOURCE + 'scss/*.scss', ['css']);
  gulp.watch(SOURCE + 'scss/**/*.scss', ['css']);
	// browserSync.reload();
	// gulp.watch(SOURCE + '*.html', ['views']);
  gulp.watch(WATCH_FILE_EXTENSIONS, ['bs-reload']);
});
