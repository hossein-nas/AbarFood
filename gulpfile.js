var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    path = {
        js_files: [
            'development/js_files/jquery.js',
            'development/js_files/custom_js_files/*.js'
        ],
        sass_files: [
            'development/sass_files/**/*.scss'
        ],
        js_dest: 'production/js_files/',
        css_dest: 'production/css_files/'
    };

gulp.task('uglify', function () {
    gulp.src(path.js_files)
        .pipe(concat('scripts.js'))
        .pipe(uglify().on('error',gutil.log))
        .pipe(gulp.dest(path.js_dest))
})

gulp.task('sass', function () {
    gulp.src(path.sass_files)
        .pipe(sass({ 
            outputStyle: 'compressed',
            includePaths : ['development/sass_files/components'] 
        }).on('error', sass.logError)    
        )
        .pipe(autoprefixer({
            browsers: ['last 20 version', 'Firefox ESR', 'safari 5', 'ie 6', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
            cascade:false
        }))
        .pipe(gulp.dest(path.css_dest));
});



gulp.task('watch', function () {
    gulp.watch(path.js_files, ['uglify']);
    gulp.watch(path.sass_files, ['sass']);
})

gulp.task('default', ['watch']);