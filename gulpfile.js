const gulp = require('gulp');
const sass = require('gulp-sass');

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
        .pipe(sass({
          outputStyle: 'expanded'
        })
        .on('error', sass.logError))
        .pipe(gulp.dest('./public/css'));
    }).on("change", reload);
  });
  