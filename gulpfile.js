var gulp = require('gulp');
var sass = require('gulp-sass');
//var browserSync = require('browser-sync').create();


// Static Server + watching scss/html files
gulp.task('watch', ['sass'], function() {

    // browserSync.init({
    //     server: "./"
    // });

    gulp.watch("scss/**/*.scss", ['sass']);
//    gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("scss/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./public/css/"))
//        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
