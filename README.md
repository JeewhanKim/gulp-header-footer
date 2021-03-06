## Installation

Install `gulp-html-header-footer` as a development dependency:

```shell
npm install --save-dev gulp-header-footer
```

** This package is a simplified version of [gulp-inject](https://www.npmjs.com/package/gulp-inject). The difference is that it does not need to update any HTML codes itself. All license behind the logic belong to [MIT](https://spdx.org/licenses/MIT.html) & [the collaborator of `gulp-inject`](https://www.npmjs.com/~joakimbeng) **

## Basic usage

**The target file `src/index.html`:**

`gulp-html-header-footer` simply injects strings of header & footer from gulp source streams.

Expected Result:

```html
<!DOCTYPE html>
<html>
<head>
  <title>index.html</title>
</head>
<body>
<!-- Header -->
<!-- Contents -->
<section>
  <div>Lorem Ipsum</div>
</section>
<!-- Contents:End -->
<!-- Footer -->
</body>
</html>
```

**`gulpfile.js`:**

```javascript

gulp.task('html-header-footer', () => {
  const headerFooter = require('gulp-html-header-footer')
  gulp.src(['./html/**/*.html'])
  .pipe(headerFooter(gulp.src(['./html/**/*.html']), 
    {
      header:'<!DOCTYPE html><html><head><title>index.html</title></head><body>', 
      footer:'</body></html>'
    }))
  .pipe(gulp.dest('./dist/'))
})

```

**`More examples - using external arguments (modules):`**

```javascript
/* _template.js */
module.exports = {
  header: require('./_header.js')(),
  footer: require('./_footer.js')()
}

/* _header.js */
module.exports = () => {
  return `
    <!DOCTYPE html><html><head><title>index.html</title></head><body>
  `
}
/* _footer.js */
module.exports = () => {
  return `
      </body>
      </html>
  `
}

```

```javascript

gulp.task('html-header-footer', () => {
  const headerFooter = require('gulp-html-header-footer')
  const template = require('./_template.js')

  gulp.src(['./html/**/*.html'])
  .pipe(headerFooter(gulp.src(['./html/**/*.html']), template))
  .pipe(gulp.dest('./dist/'))
})

```
