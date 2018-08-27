var project 		= 'visaya1', // zip file name
	url 			= 'localhost:3000', // Local Development URL for BrowserSync.
	build 			= './build/', // temp folder for building files
	buildInclude 	= [
						// include common file types
						'**/*.php',
						'**/*.html',
						'**/*.css',
						'**/*.js',
						'**/*.svg',
						'**/*.ttf',
						'**/*.otf',
						'**/*.eot',
						'**/*.woff',
						'**/*.woff2',
						// include specific files and folders
						'screenshot.png',
						'**/images/*',
						// exclude files and folders
						'!node_modules/**/*',
						'!style.css.map',
						'!assets/js/custom/*',
						'!assets/js/vendor/*',
						'!assets/styles/vendor/*',
						'!assets/styles/custom/*',

					];

// Load plugins
	var gulp     = require('gulp'),
		browserSync  = require('browser-sync'),
		reload       = browserSync.reload,
		autoprefixer = require('gulp-autoprefixer'),
		minifycss    = require('gulp-uglifycss'),
		filter       = require('gulp-filter'),
		uglify       = require('gulp-uglify'),
		rename       = require('gulp-rename'),
		concat       = require('gulp-concat'),
		notify       = require('gulp-notify'),
		cmq          = require('gulp-merge-media-queries'),
		runSequence  = require('gulp-run-sequence'),
		sass         = require('gulp-sass'),
		ignore       = require('gulp-ignore'),
		rimraf       = require('gulp-rimraf'),
		zip          = require('gulp-zip'),
		plumber      = require('gulp-plumber'),
		cache        = require('gulp-cache'),
		sourcemaps   = require('gulp-sourcemaps');


/**
 * Browser Sync
 *
 */
gulp.task('browser-sync', function() {
	var files = [
					'**/*.php',
					'**/*.{png,jpg,gif}'
				];
	browserSync.init(files, {
		proxy: "localhost:3000",
		port: 3010,
		injectChanges: true
	});
});

/**
 * Styles
 */
gulp.task('customStyles', function () {
 	gulp.src('./assets/scss/custom/*.scss')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass({
			errLogToConsole: true,
			sourceComments: 'map',
			/*outputStyle: 'compact',*/
			precision: 10
		}))
		.pipe(sourcemaps.write({includeContent: false}))
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(autoprefixer('last 2 versions', '> 1%', 'Firefox ESR', 'android 4'))
		.pipe(sourcemaps.write('.'))
		.pipe(plumber.stop())
		.pipe(gulp.dest('./assets/css/'))
		.pipe(filter('**/*.css'))
		.pipe(cmq())
		.pipe(reload({stream:true}))
		.pipe(rename({ suffix: '.min' }))
		.pipe(minifycss({
			maxLineLen: 80
		}))
		.pipe(gulp.dest('./assets/css/'))
		.pipe(reload({stream:true}))
		.pipe(notify({ message: 'SASS Style task complete', onLast: true }))
});

gulp.task('vendorStyles', function () {
    return gulp
        .src('./assets/scss/vendor/*.css')
        .pipe(concat('vendor.min.css'))
        .pipe(gulp.dest('./assets/css/'));
});

/**
 * Scripts: Vendors
 */
gulp.task('vendorJs', function() {
	return 	gulp.src(['./assets/js/vendor/*.js'])
				.pipe(concat('vendor.js'))
				.pipe(gulp.dest('./assets/js'))
				.pipe(rename( {
					basename: "vendor",
					suffix: '.min'
				}))
				.pipe(uglify())
				.pipe(gulp.dest('./assets/js/'))
				.pipe(notify({ message: 'Vendor scripts task complete', onLast: true }));
});


/**
 * Scripts: Custom -> Our own js code
 */

gulp.task('customJs', function() {
	return 	gulp.src('./assets/js/custom/*.js')
				.pipe(concat('custom.js'))
				.pipe(gulp.dest('./assets/js'))
				.pipe(rename( {
					basename: "custom",
					suffix: '.min'
				}))
				.pipe(uglify())
				.pipe(gulp.dest('./assets/js/'))
				.pipe(notify({ message: 'Custom scripts task complete', onLast: true }));
});

/**
 * Clean gulp cache
 */
 gulp.task('clear', function () {
   cache.clearAll();
 });


 /**
  * Clean tasks for zip
  */

 gulp.task('cleanup', function() {
 	return 	gulp.src(['**/.sass-cache','**/.DS_Store', build ], { read: false })
		 		.pipe(ignore('node_modules/**'))
		 		.pipe(rimraf({ force: true }))
  });
 gulp.task('cleanupFinal', function() {
 	return 	gulp.src(['**/.sass-cache','**/.DS_Store'], { read: false })
		 		.pipe(ignore('node_modules/**'))
		 		.pipe(rimraf({ force: true }))
 });

 /**
  * Gulp Default Task
  */

 // Package Theme
 gulp.task('build', function(cb) {
 	runSequence('customStyles', 'vendorStyles', 'cleanup', 'vendorJs', 'customJs', 'cleanupFinal', cb);
 });

 // Watch Task
 gulp.task('default', ['customStyles', 'vendorStyles', 'cleanup', 'vendorJs', 'customJs', 'browser-sync'], function () {
 	gulp.watch('./assets/scss/custom/**/*.scss', ['customStyles']);
    gulp.watch('./assets/scss/custom/*.scss', ['customStyles']);
	gulp.watch('./assets/scss/vendor/*.css', ['vendorStyles']);
	gulp.watch('./assets/js/vendor/*.js', ['vendorJs', browserSync.reload]);
 	gulp.watch('./assets/js/custom/*.js', ['customJs', browserSync.reload]);

 });
