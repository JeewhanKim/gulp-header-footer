## Installation

Install `gulp-html-header-footer` as a development dependency:

```shell
npm install --save-dev gulp-header-footer
```

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
    ...
  `
}
/* _footer.js */
module.exports = () => {
  return `
      </main>
      </div>
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
