const { series, src, dest, parallel } = require('gulp');
const rename = require('gulp-rename');
const zip = require('gulp-zip');
const clean = require('gulp-clean');

const pkg = require('./package.json');
const TARGETS = ['linux', 'win32', 'darwin'];

function copyDependency(target, pkg) {
    return () => src('node_modules/' + pkg + '/**').pipe(dest('dist/Arcomage-' + target + '-x64/resources/app/node_modules/' + pkg));
}
const copyDependencieTasks = [];
for (let dependency in pkg.dependencies) {
    for (let platform of TARGETS) {
        copyDependencieTasks.push(copyDependency(platform, dependency));
    }
}

function copyProdEnv(target) {
    return () => src('.env.prod').pipe(rename('.env')).pipe(dest('dist/Arcomage-' + target + '-x64/resources/app/'));
}
const copyProdEnvTasks = [];
for (let platform of TARGETS) {
    copyProdEnvTasks.push(copyProdEnv(platform));
}

function archiveMoveToTmp(target) {
    return () => src('dist/Arcomage-' + target + '-x64/**')
        .pipe(dest('dist/tmp/Arcomage-' + target + '-x64/Arcomage'))
}
function archive(target) {
    return () => src('dist/tmp/Arcomage-' + target + '-x64/**')
        .pipe(zip('Arcomage-' + target + '-x64.zip'))
        .pipe(dest('dist/archive'))
}
const archiveTasks = [];
for (let platform of TARGETS) {
    archiveTasks.push(series(archiveMoveToTmp(platform), archive(platform)));
}

function cleanUp() {
    return src('dist/tmp', { read: false })
        .pipe(clean());
};

exports.default = series(
    parallel(copyDependencieTasks),
    parallel(copyProdEnvTasks),
    parallel(archiveTasks),
    cleanUp
);