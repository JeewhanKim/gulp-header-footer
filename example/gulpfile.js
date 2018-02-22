const gulp = require('gulp')

gulp.task('default', () => {
  const headerFooter = require('../gulp-html-header-footer')
  const template = require('./_template.js')

  gulp.src(['./*.html'])
  .pipe(headerFooter(gulp.src(['./*.html']), template))
  .pipe(gulp.dest('./dist/'))
})