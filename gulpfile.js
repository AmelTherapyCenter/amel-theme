import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import uglify from 'gulp-uglify';
import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';

gulp.task('minify-css', function() {
    return gulp.src('assets/css/*.css')
        .pipe(concat('main.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('assets/dist'));
});
  
gulp.task('minify-js', function() {
    return gulp.src('assets/js/*.js')
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest('assets/dist'));
});
  
// gulp.task('minify-html', function() {
//     return gulp.src('views/**/*.hbs')
//       .pipe(htmlmin({collapseWhitespace: true}))
//       .pipe(gulp.dest('_site'));
// });
// 
// gulp.task('default', gulp.series('minify-css', 'minify-js', 'minify-html'));
gulp.task('default', gulp.series('minify-css', 'minify-js'));