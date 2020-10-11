const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const connect = require('gulp-connect');
const cleanCSS = require("gulp-clean-css");
const rename   = require("gulp-rename");
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

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

    return gulp.watch(['./public/*.html', './public/sass/*.scss', './public/sass/layout/*.scss'], function () {
      return gulp.src('./public/sass/main.scss')
        .pipe(
            sass({
              outputStyle: 'expanded'
            })
        .on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest('./public/css/'));
    }).on("change", reload);
});

// js compiler task
gulp.task('js-minify', function() {
    return gulp.src('./public/js/main.js')
        .pipe(babel({
          "presets": ["@babel/preset-env"]
        }))
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('./public/js/'));
});

// sass compiler task
gulp.task('css-minify', function () {
  return gulp.src('./public/sass/main.scss')
    .pipe(
        sass({
          outputStyle: 'expanded'
        })
    .on('error', sass.logError))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(cleanCSS())
    .pipe(rename({
        extname: '.min.css'
    }))
    .pipe(gulp.dest('./public/css/'))
    .pipe(connect.reload());
});

gulp.task('build', gulp.series(gulp.parallel('js-minify', 'css-minify')));