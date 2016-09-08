/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   06-09-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 08-09-2016
*/

var gulp                = require("gulp"),
    browserify          = require("browserify"),
    source              = require('vinyl-source-stream'),
    watchify            = require("watchify"),
    tsify               = require("tsify"),
    gutil               = require("gulp-util"),
    uglify              = require('gulp-uglify'),
    sourcemaps          = require('gulp-sourcemaps'),
    buffer              = require('vinyl-buffer'),
    bower               = require('gulp-bower'),
    concat              = require('gulp-concat'),
    sass                = require('gulp-sass'),
    cssmin              = require('gulp-cssmin'),
    removeHtmlComments  = require('gulp-remove-html-comments'),
    rename              = require("gulp-rename"),
    autoprefixer        = require('gulp-autoprefixer'),
    browserSync         = require('browser-sync').create(),
    reload              = browserSync.reload,
    strip               = require('gulp-strip-comments');

// Config of project folders
var paths = {
    pages     : ['dev/www/*.html'], 
    bowerDir  : './dev/src/bower_components' ,
    desDir    : './dist'
};

// all bower dependencies js files you want add to your project
var bowerDependencies = [
  paths.bowerDir + '/jquery/dist/jquery.min.js',
  paths.bowerDir + '/materialize/dist/js/materialize.min.js'
]
//// Gulp runing task availables:
// 1: Default task. This will be run when no task is passed in arguments to $ gulp
gulp.task("run",[
  'js-dependencies',
  'sass-dependencies',
  'fonts-dependencies',
  'sass',
  'copy-html',
  'bundle-ts'
]);
gulp.task('default', ['run'], function() {
    gulp.start('startServer', 'watch');
});

//// 1 (run by '$ npm start'): run bower install for installing all dependencies
gulp.task('bower', function() { 
    return bower()
         .pipe(gulp.dest(paths.bowerDir)) 
});

/// 2 : task to get only one js file with all bower dependencies
gulp.task('js-dependencies', function() {
  return gulp.src(bowerDependencies)
      .pipe(concat('js-dependencies.js'))
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(gulp.dest(paths.desDir + '/js'))
});

// 3: materialize Sass task
gulp.task('sass-dependencies', function() { 
    return gulp.src([paths.bowerDir + '/materialize/sass/*.scss'])
        .pipe(sass())
        .pipe(cssmin({keepSpecialComments : 0}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.desDir + '/css'))
});

// 4: Fonts task
gulp.task('fonts-dependencies', function() { 
    return gulp.src([paths.bowerDir + '/materialize/fonts/**/*.*'])
        .pipe(gulp.dest(paths.desDir + '/fonts')); 
});

// 7: bundle all sass files in dev/scss folder
gulp.task('sass', function () {
    return gulp.src('./dev/src/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.desDir + "/css"))
        .pipe(reload({stream:true}));
});
// 5: Copy templates files in dev/www folder to dist
gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(removeHtmlComments())
        .pipe(gulp.dest("dist"))
        .pipe(reload({stream:true}));
});

// # Build app.bundle.js from all ts files
var watchedBrowserify = watchify(browserify({
    basedir        : '.',
    debug         : true,
    entries       : ['dev/app/app.ts'],
    cache         : {},
    packageCache  : {}
})
.plugin(tsify));

gulp.task("bundle-ts", function () {
  return watchedBrowserify
      .bundle()
      .pipe(source('app.bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest("dist/js"))
      .pipe(reload({stream:true}));
});

// #: Start a test server with browserSync at build folder and
// listening to 3000 port. Home page = http://localhost:3000
gulp.task("startServer",  function() {
    //initialize browsersync
    browserSync.init({
      server: {
          baseDir: paths.desDir
      },
      notify: true
    });
});

// #: Watches task is use to run gulp task if a listed files change
// You can add more watch files if you need.
gulp.task('watch', function() {
  gulp.watch('./dev/app/**/*.ts', ['bundle-ts']);                    // watch js file changes
  gulp.watch('./dev/**/*.html', ['copy-html']);      // watch all html template file changes
  gulp.watch('./dev/src/scss/**/*.scss', ['sass']); 
  //gulp.watch('PATH-OF-FILES-TO-WATCH', ['TASK-TO-RUN']);   // Simply uncomment exemple and set your own params (files-to-watch && task-to-run).
})
