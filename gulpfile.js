//here is the quote info:  http://blog.nodejitsu.com/npmawesome-9-gulp-plugins/

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    mincss = require('gulp-mini-css'),//another plugin gulp-minify-css
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),//this plugin can minify the js file
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    plumber=require('gulp-plumber'),
    rename=require('gulp-rename'),
    filesize = require('gulp-filesize'),
    path={
        scss_src:'public/source/scss/**/*.scss',
        css_des:'public/static/css/',
        js_src:'public/source/js/**/*.js',
        js_des:'public/static/js/'
    };


//when meeting error when input scss .gulp process will crash.we need the package gulp-plember

gulp.task('default', function() {
    console.log('开始了gulp 任务');
});


//this task first convert sass to css.then minify the cssiq
gulp.task('sass',function(){
    return gulp.src(path.scss_src)
        .pipe(plumber())
        // .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(mincss())
        // .pipe(sourcemaps.write('/'))

        .pipe(concat('style.min.css'))
        .pipe(gulp.dest(path.css_des))
});

gulp.task('script',function(){
    return gulp.src(path.js_src)
       .pipe(concat('ultimate.js'))
       .pipe(uglify())
       .pipe(gulp.dest(path.js_des))
       .pipe(rename('ultimate.min.js'))
       .pipe(gulp.dest(path.js_des))
       .pipe(filesize());
})




//this task just minify scss.not convert sass to css
gulp.task('mincss',function(){
    return gulp.src(path.scss_src)
           .pipe(mincss())
           .pipe(gulp.dest(path.css_des));

});


//watch the file's change
gulp.task('watch',['sass'],function(){
    gulp.watch(path.scss_src,['sass']);

});

