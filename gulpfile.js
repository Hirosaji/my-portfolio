// gulpプラグインの読み込み
const gulp = require('gulp');
// Sassをコンパイルするプラグインの読み込み
const sass = require('gulp-sass');

const browserSync = require('browser-sync');
const reload = browserSync.reload;

// style.scssの監視タスクを作成する
gulp.task('server', function () {
    browserSync({
        notify: false,
        server: {
            baseDir: "./"
        }
    });

    // 各ファイルを監視
    return gulp.watch(['./*.html', './sass/*.scss', './js/*.js'], function () {
      // style.scssファイルを取得
      return gulp.src('./sass/main.scss')
        // Sassのコンパイルを実行
        .pipe(sass({
          outputStyle: 'expanded'
        })
        // Sassのコンパイルエラーを表示
        .on('error', sass.logError))
        // cssフォルダー以下に保存
        .pipe(gulp.dest('./css'));
    }).on("change", reload);
  });
  