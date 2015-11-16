/* ==========================================================================
   Load dependencies
   ========================================================================== */
var gulp    = require('gulp'),
    del     = require('del'),
    plugins = require('gulp-load-plugins')(),
    pkg     = require('./package.json'),
    dirs    = pkg.settings.folders;

// Temporary solution until gulp 4
// https://github.com/gulpjs/gulp/issues/355
var runSequence = require('run-sequence');

/* ==========================================================================
   Helper tasks
   ========================================================================== */

/* Clean
   ========================================================================== */

// Delete dist folder
gulp.task('clean', function(){
  return del([
    dirs.dist
  ]);
});


/* Copy
   ========================================================================== */

// Copy
gulp.task('copy', function(){
  gulp.src([
    // Include all
    dirs.src + '/**',

    // Exclude
    '!'+dirs.src +'/assets/less/**',
    '!'+dirs.src +'/assets/less',
    '!'+dirs.src +'/assets/js/**'

  ])
    .pipe(gulp.dest(dirs.dist));
});

/* Stylesheets
   ========================================================================== */

// Stylesheets
gulp.task('less', function () {
  return gulp.src(dirs.src + '/assets/less/style.less')

    // Less
    .pipe(plugins.less())

    // Autoprefixer
    .pipe(plugins.autoprefixer())
    .pipe(plugins.rename('style.full.css'))
    .pipe(gulp.dest(dirs.dist + '/assets/css/'))

    // Minify
    .pipe(plugins.minifyCss())
    .pipe(plugins.rename('style.css'))
    .pipe(gulp.dest(dirs.dist + '/assets/css/'));

});


/* Javascripts
   ========================================================================== */

gulp.task('js', function(){
  return gulp.src([

    'bower_components/jquery/dist/jquery.js',

    // Add more libraries here
    // 'bower_components/...',

    dirs.src + '/assets/js/module/**/*.js',
    dirs.src + '/assets/js/main.js'
  ])

  // Concat
  .pipe(plugins.concat('all.full.js'))
  .pipe(gulp.dest(dirs.dist + '/assets/js/'))

  // Uglify
  .pipe(plugins.uglify().on('error', plugins.util.log))
  .pipe(plugins.rename('all.js'))
  .pipe(gulp.dest(dirs.dist + '/assets/js/'));

});


/* Watch
   ========================================================================== */

gulp.task('watch', function () {
    gulp.watch(dirs.src + '/assets/js/**/*.js', ['js']);
    gulp.watch(dirs.src + '/assets/less/**/*.less', ['less']);
    gulp.watch(dirs.src + '/*.html', ['build']);
    plugins.livereload.listen();
    gulp.watch(dirs.dist + '/**/*').on('change', plugins.livereload.changed);
});

/* ==========================================================================
   Main tasks
   ========================================================================== */

/* Default
   ========================================================================== */

gulp.task('default', function (done){
  runSequence('build', 'watch', done);
});

/* Build
   ========================================================================== */

gulp.task('build', function (done) {
    runSequence(
        'clean',
        'copy',
        ['less', 'js'],
        done);
});



/* Comments
   ========================================================================== */


// Stylesheets
// less
// autoprefix
// uncss
// cssmin
// notify


// Scripts
// concat
// uglify
// clean
// notify

// Media
// imagemin
// svgmin
// grunticon
// notify

// Build
// clean
// copy
// stylesheets
// scripts
// media
// usebanner
// notify

