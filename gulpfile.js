const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));

// Copy reveal.js files
gulp.task('copy-reveal', function() {
  return gulp.src('node_modules/reveal.js/**/*')
    .pipe(gulp.dest('dist/reveal.js'));
});

// Copy images
gulp.task('copy-images', function() {
  return gulp.src('images/**/*')
    .pipe(gulp.dest('dist/images'));
});

// Compile SCSS
gulp.task('sass', function() {
  return gulp.src('css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

// Copy HTML
gulp.task('copy-html', function() {
  return gulp.src('*.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

// Watch task
gulp.task('watch', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
    port: 8000
  });

  gulp.watch('*.html', gulp.series('copy-html'));
  gulp.watch('css/*.scss', gulp.series('sass'));
  gulp.watch('images/**/*', gulp.series('copy-images'));
});

// Build task
gulp.task('build', gulp.series('copy-reveal', 'copy-images', 'sass', 'copy-html'));

// Default task
gulp.task('default', gulp.series('build', 'watch'));
