## Installation

Install `gulp-header-footer` as a development dependency:

```shell
npm install --save-dev gulp-header-footer
```

## Basic usage

**The target file `src/index.html`:**

`gulp-header-footer` simply injects strings of header & footer from gulp source streams.

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

