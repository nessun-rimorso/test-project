'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');
var svgstore = require('gulp-svgstore');
var posthtml = require('gulp-posthtml');
var include = require('posthtml-include');
var del = require('del');
var babel = require('gulp-babel');
const terser = require('gulp-terser');

gulp.task('css', function () {
    return gulp.src('source/sass/style.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(gulp.dest('build/css'))
        .pipe(csso())
        .pipe(rename("style.min.css"))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('build/css'))
        .pipe(server.stream());
});

gulp.task('js', function (){
    return gulp.src('source/js/index.js')
        .pipe(babel())
        .pipe(terser())
        .pipe(gulp.dest('build/js'));
});

gulp.task('sprite', function () {
    return gulp.src('source/img/**/*.svg')
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename('sprite.svg'))
        .pipe(gulp.dest('build/img'));
});

gulp.task('html', function () {
    return gulp.src('source/*.html')
        .pipe(posthtml([
            include()
        ]))
        .pipe(gulp.dest('build'));
});

gulp.task('images', function () {
    return gulp.src('source/img/**/*.{jpg,svg}')
        .pipe(imagemin([
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.jpegtran({progressive: true}),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest('source/img'));
});

gulp.task('webp', function () {
    return gulp.src('source/img/**/*.{png,jpg}')
        .pipe(webp({quality: 92}))
        .pipe(gulp.dest('source/img'));
});

gulp.task('copy', function () {
    return gulp.src([
        'source/fonts/**/*.{woff,woff2}',
        'source/img/**',
        'source/*.ico'
    ], {
        base: 'source'
    })
        .pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
    return del('build');
});

gulp.task('build', gulp.series(
    'clean',
    'images',
    'copy',
    'js',
    'css',
    'sprite',
    'html'
));

gulp.task('server', function () {
    server.init({
        server: 'build/',
        notify: false,
        open: true,
        cors: true,
        ui: false
    });

    gulp.watch('source/sass/**/*.{scss,sass}', gulp.series('css'));
    gulp.watch('source/img//**/*.svg', gulp.series('sprite', 'html', 'refresh'));
    gulp.watch('source/*.html', gulp.series('html', 'refresh'));
    gulp.watch('source/js/*.js', gulp.series('js', 'refresh'));
});

gulp.task('refresh', function (done) {
    server.reload();
    done();
});

gulp.task('start', gulp.series('build', 'server'));
