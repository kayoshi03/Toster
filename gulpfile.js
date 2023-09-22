const {src, dest} = require('gulp')
const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const del = require('del')
const bs = require('browser-sync').create()


const srcPath = "src/"
const destPath = "dest/"
const path = {
    build: {
        html: destPath,
        css: destPath + "css/",
        js: destPath + "js/",
        img: destPath + "img/",
        font: destPath + "fonts/"
    },
    src: {
        html: srcPath + "*.html",
        css: srcPath + "scss/*.scss",
        js: srcPath + "js/*.js",
        img: srcPath + "img/*.{jpg,png,webp,svg,ico}",
        font: srcPath + "fonts/*.{ttf,eot,woff,woff2}"
    },
    watch: {
        html: srcPath + "*.html",
        css: srcPath + "scss/*.scss",
        js: srcPath + "js/*.js",
        img: srcPath + "img/*.{jpg,png,webp,svg,ico}",
        font: srcPath + "fonts/*.{ttf,eot,woff,woff2}"
    },
    clean: "./" + destPath
}
const server = () => {
    bs.init({
        server: {
            baseDir: "./" + destPath
        }
    })
}
const html = () => {
    return src(path.src.html, {base: srcPath})
        .pipe(dest(path.build.html))
        .pipe(bs.reload({stream: true}))
}
const css = () => {
    return src(path.src.css, {base: srcPath + "scss/"})
        .pipe(sass())
        .pipe(dest(path.build.css))
        .pipe(bs.reload({stream: true}))
}
const js = () => {
    return src(path.src.js, {base: srcPath + "js/"})
        .pipe(dest(path.build.js))
        .pipe(bs.reload({stream: true}))
}
const img = () => {
    return src(path.src.img, {base: srcPath + "img/"})
        .pipe(dest(path.build.img))
        .pipe(bs.reload({stream: true}))
}
const font = () => {
    return src(path.src.font, {base: srcPath + "fonts/"})
        .pipe(dest(path.build.font))
        .pipe(bs.reload({stream: true}))
}
const clean = () => {
    return del(path.clean)
}

const watchFiles = () => {
    gulp.watch([path.watch.html], html)
    gulp.watch([path.watch.css], css)
    gulp.watch([path.watch.js], js)
    gulp.watch([path.watch.img], img)
}

const build = gulp.series(clean, gulp.parallel(html, css, js, img, font))
const watch = gulp.parallel(build, watchFiles, server)
exports.html = html
exports.css = css
exports.js = js
exports.img = img
exports.clean = clean
exports.font = font
exports.build = build
exports.watch = watch