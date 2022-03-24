/* ======================================================================================================
 * Plugins utilizados
 * ======================================================================================================*/
let gulp = require('gulp');
let sass = require('gulp-sass');
let cssmin = require('gulp-cssmin');
let autoprefixer = require('gulp-autoprefixer');
let notify = require('gulp-notify');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let browserSync = require('browser-sync').create();
let pug = require('gulp-pug');
let rename = require('gulp-rename');
let urlAdjuster = require('gulp-css-replace-url');
let imagemin = require("gulp-imagemin");
let webp = require("imagemin-webp");
let extReplace = require("gulp-ext-replace");
let watch = require('gulp-watch');
// let pugphp = require('gulp-jade-php');
// let php  = require('gulp-connect-php');
    


/* ======================================================================================================
 * Tarea PUG
 * ======================================================================================================*/
gulp.task('pug', function() {
    return gulp.src(['./src/pug/*.pug', '!./src/pug/includes'])
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./dist/'))
});

// PHP
// gulp.task('pug', () => {
   
//     return gulp.src(['./src/pug/*.pug', '!./src/pug/includes'])
//         .pipe(pug({
//             pretty: true
//         }))
//         .pipe(rename({
//             extname: ".php"
//         }))
//         // .pipe(rewriteImagePath({
//         //     path: "build/images",
//         // }))
//         .pipe(gulp.dest('./dist/'));
        
// });


/* ======================================================================================================
 * Tarea PUG to php
 * ======================================================================================================*/



// gulp.task('pugphp', () => {
//     return gulp.src(['./src/pug/*.pug', '!./src/pug/includes'])
       
//        .pipe(rename({
//             extname: ".php"
//         }))
//         .pipe(pugphp({
//             pretty: false
//         }))
//         .pipe(gulp.dest('./dist/'));
//   });


/* ======================================================================================================
 * Tarea sobre los Estilos SCSS
 * ======================================================================================================*/

gulp.task('sass', () => {

    return gulp.src('./src/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin().on('error', function(err) {
            console.log(err);
        }))
        .pipe(urlAdjuster({
            replace:  ['../../img/','../img/'],
        }))
        .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./src/css/'))
        .pipe(notify({ title: "SCSS", message: "OK" }))
        .pipe(browserSync.stream());
});


/* ======================================================================================================
 * Tarea sobre css minify
 * ======================================================================================================*/

gulp.task('minifyCSS', () => {

    return gulp.src('./src/css/*.css')
        .pipe(cssmin())
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(browserSync.stream());


});

/* ======================================================================================================
 * Tarea sobre minify image
 * ======================================================================================================*/
gulp.task('img', () => {
    gulp.src('./src/img/**/**.*')
        // .pipe(imagemin())
        .pipe(gulp.dest('./dist/img/'))

});


/* ======================================================================================================
 * Tarea para crear imagenes webp
 * ======================================================================================================*/


gulp.task("exportWebP", () => {
    let src = "./src/img/**/*.{jpg,png}";
    let dest = "./src/img/"; 
    let destDist = "./dist/img/"; 
  
    return gulp.src(src)
      .pipe(imagemin([
        webp({
          quality: 75
        })
      ]))
      .pipe(extReplace(".webp"))
      .pipe(gulp.dest(dest))
      .pipe(gulp.dest(destDist));
  });

/* ======================================================================================================
 * Tarea sobre los Scripts
 * ======================================================================================================*/
gulp.task('scripts', () => {
    return gulp.src([
        './src/js/jquery-3.4.1.min.js',
        './src/js/*.js'
    ])

    .pipe(uglify())
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest('./dist/js/'));
});


/* ======================================================================================================
 * Send Fonts and Images
 * ======================================================================================================*/
gulp.task('pastefiles', () => {

    gulp.src("./src/fonts/**/**.*")
        .pipe(gulp.dest('./dist/fonts/'));

    gulp.src('./src/img/**/**.*')
        .pipe(gulp.dest('./dist/img/'));

});


/* ======================================================================================================
 * Tarea por default
 * ======================================================================================================*/
gulp.task('watch', () => {
    gulp.watch('./src/scss/**/**.scss', gulp.series('sass'));
    gulp.watch('./src/css/**/**.css', gulp.series('minifyCSS'));
    gulp.watch('./src/js/*.js', gulp.series('scripts'));
    // gulp.watch('./src/pug/**/*.pug', gulp.series('pugphp'));
    gulp.watch('./src/pug/**/*.pug', gulp.series('pug'));
    gulp.watch('./src/img/**/**.*',  gulp.series('img'));
    gulp.watch('./src/fonts/*',  gulp.series('pastefiles'));
    
});

/* ======================================================================================================
 * Browser Sync
 * ======================================================================================================*/


gulp.task('browser-sync', () => {


    browserSync.init({
        injectChanges: true,
        files: ['*.html', './dist/**/*.{html,css,js}'],
        server: "./dist/",
        // proxy: 'localhost/',
        // proxy: '127.0.0.1:8010',
    });
    
    // gulp.watch('./src/pug/**/*.pug', gulp.parallel('pugphp'));
    gulp.watch('./src/pug/**/*.pug', gulp.parallel('pug'));
    gulp.watch('./src/scss/**/**.scss', gulp.parallel('sass'));
    gulp.watch('./src/css/**/**.css', gulp.parallel('minifyCSS'));
    gulp.watch('./src/js/*.js', gulp.parallel('scripts'));
    gulp.watch('./dist/');
    gulp.watch('./dist/').on('change', browserSync.reload);

});


// PHP VERSION
// gulp.task('browser-sync', () => {

//     php.server({ 
//         dir: './dist/',
//         port: 3000,
//         keepalive: true
//     });

//     browserSync.init({
//         injectChanges: true,
//         files: ['*.html', './dist/**/*.{html,php,css,js}'],
//         proxy: 'localhost/',
//         // proxy: '127.0.0.1:8010',
//     });
    
//     // gulp.watch('./src/pug/**/*.pug', gulp.parallel('pugphp'));
//     gulp.watch('./src/pug/**/*.pug', gulp.parallel('pug'));
//     gulp.watch('./src/scss/**/**.scss', gulp.parallel('sass'));
//     gulp.watch('./src/css/**/**.css', gulp.parallel('minifyCSS'));
//     gulp.watch('./src/js/*.js', gulp.parallel('scripts'));
//     gulp.watch('./dist/');
//     gulp.watch('./dist/').on('change', browserSync.reload);

// });

    


/* ======================================================================================================
 * Default Task
 * ======================================================================================================*/

// gulp.task('default', gulp.parallel('pugphp', "sass", 'scripts', "minifyCSS" , 'img', 'exportWebP', 'pastefiles', 'watch','browser-sync'));
gulp.task('default', gulp.parallel('pug', "sass", 'scripts', "minifyCSS" , 'img', 'exportWebP', 'pastefiles', 'watch','browser-sync'));
