const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const connect = require('gulp-connect');

const browserSync = require('browser-sync');
const reload = browserSync.reload;

// Set monitoring task
gulp.task('server', function () {
    browserSync({
        notify: false,
        server: {
            baseDir: "./public"
        }
    });

    return gulp.watch(['./public/*.html', './public/sass/*.scss', './public/js/*.js'], function () {
      return gulp.src('./public/sass/main.scss')
        .pipe(
            sass({
              outputStyle: 'expanded'
            })
        .on('error', sass.logError))
        .pipe(gulp.dest('./public/css/'));
    }).on("change", reload);
});

// sass compiler task
gulp.task('sass', function () {
  return gulp.src('./public/sass/main.scss')
    .pipe(
        sass({
          outputStyle: 'expanded'
        })
    .on('error', sass.logError))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('./public/css/'))
    .pipe(connect.reload());
});

gulp.task('build', gulp.task('sass'));