const { dest, series, src, watch } = require('gulp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');

const paths = {
    src: {
        base: 'src',
        files: [
            'src/clarified/style.css',
            'src/minimal/style.css'
        ]
    },
    dest: 'dist'
}

function buildCss() {
    return src(paths.src.files, { base: paths.src.base })
        .pipe(postcss([
            autoprefixer(),
            cssnano()
        ]))
        .pipe(dest(paths.dest));
}

function watchFiles() {
    watch(paths.src.files, buildCss);
}

const buildTask = series(buildCss);
const watchTask = series(buildCss, watchFiles);

exports.build = buildTask;
exports.watch = watchTask;
exports.default = buildTask;
