var gulp = require('gulp')
var tinylr = require('tiny-lr')

gulp.task('watch', () => {
  var lr = tinylr()
  lr.listen(35729, () => {
    console.log('... LiveReload on localhost:35729\n')
  })
  gulp.watch(['index.html', 'js/**/*', 'css/**/*'], evt => {
    console.log(evt.path)
    lr.changed({
      body: {
        files: [evt.path]
      }
    })
  })
})
