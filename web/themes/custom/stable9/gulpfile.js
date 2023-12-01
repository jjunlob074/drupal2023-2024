var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var connect = require('gulp-connect-php');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

/*AL PARECER ESTÁ DESCONTINUADO EL AUTOPREFIXER*/
//var autoprefixer = require('gulp-autoprefixer');

function sassTask() {
  return gulp.src('./scss/**/*.scss')
  .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    //.pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
}

function watchTask() {
  gulp.watch('./templates/**/*.html.twig', reload);
  gulp.watch('./css/**/*.css', reload);
  gulp.watch('./js/**/*.js', reload);
  gulp.watch('./scss/**/*.scss', gulp.series(sassTask));
}

function serverTask(done) {
  connect.server({}, function () {
    browserSync.init({
      proxy: 'https://drupalprueba.ddev.site/'
    });
    done();
  });
}

gulp.task('watch', gulp.series(serverTask, watchTask));
gulp.task('sass', sassTask);
