var gulp =  require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject("tsconfig.json");
var uglify = require('gulp-uglify');
var server = require('gulp-develop-server');

gulp.task('copy-init-files', function() {
    return gulp
        .src([
            './src/bin/*'
        ], { base: './src' })
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-configuration-files', function() {
    return gulp
        .src([
            './*.json'
        ], { base: '.' })
        .pipe(gulp.dest('dist'));
});

gulp.task('compile', function() {
    return tsProject.src()
        .pipe(ts(tsProject))
        .js
        .pipe(uglify({
            mangle: true
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('server:start', ['copy-init-files', 'copy-configuration-files', 'compile'], function() {
    server.listen({ path: 'dist/bin/www' }, function(error) {
        console.log(error);
    });
});

gulp.task('server:restart', ['compile'], function() {
    server.restart();
});

gulp.task("default", ['server:start'], function () {
    gulp.watch(['*.ts', 'routes/*.ts'], ['server:restart']);
});