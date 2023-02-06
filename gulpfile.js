//Gulp npm packages
const {src, dest, parallel, series, watch} = require('gulp');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel'); 


//Sökvägar
const files = {
    htmlPath: "src/*.html",
    sassPath: "src/scss/*.scss",
    tsPath: "src/es/*.js",
    imagePath: "src/images/*"
}

//HTML-task, kopiera html
function copyHTML() {
    return src(files.htmlPath)
    //Lägger de i "pub"-mappen
    .pipe(dest('pub'))
    //Visar de i liveservern
    .pipe(browserSync.stream());
}


//Sass-task, scss -> css
function sassTask() {
    return src(files.sassPath)
    //Sourcemaps för felsökning
    .pipe(sourcemaps.init())
    //Miniferar filerna
    .pipe(sass({outputStyle: 'compressed'}).on("error", sass.logError))
    //Lägger de i pub-mappen "css"
    .pipe(dest('pub/css'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(browserSync.stream());
}

//TS-task, minimera och transpilera typescript/ECMAscript till JavaScript
function tsTask() {
    return src(files.tsPath)
    //Babel för ECMAScript
    .pipe(babel({
        presets: ['@babel/env']
    }))
    //Minimerar filerna
    .pipe(terser())
    //Lägger de i pub/js-mappen
    .pipe(dest('pub/js')); 
}

//Image-task
function imageTask() {
    return src(files.imagePath)
    //Imagemin - minimerar filerna
    .pipe(imagemin())
    //Skickar till pub-mappen
    .pipe(dest('pub/images'));
}

//Watch-task, säger åt gulp att hålla koll på dessa filer och om de ändras
function watchTask() {
    //Liveserver i gulp
    browserSync.init({
        server: "./pub/index.html"
    });

    watch([files.htmlPath, files.sassPath,files.tsPath, files.imagePath], parallel(copyHTML, sassTask,  tsTask, imageTask)).on('change', browserSync.reload);
}

//Först vill vi köra alla fyra functioner innan vi kör igång watchTask
exports.default = series (
    //Dessa kan köras samtidigt - därav "parallel"
    parallel(copyHTML, sassTask, tsTask, imageTask),
    watchTask
);