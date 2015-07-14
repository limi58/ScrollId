var gulp = require('gulp');
var rename = require('gulp-rename');
var header = require('gulp-header');
var uglify = require('gulp-uglify');

var date = new Date();
var time = date.getFullYear() + '/' + (parseInt(date.getMonth()) + 1) + '/' + date.getDate();

var copyright = ['/**',
  ' * ScrollId',
  ' * ' + time,
  ' * link      : https://github.com/limi58/ScrollId',
  ' * copyright : limi58 , http://www.imbgf.com',
  ' */',
  ''].join('\n');

gulp.task('minijs',function(){
		gulp.src('./ScrollId.js')
	    .pipe(header(copyright))
	    .pipe(gulp.dest('dest/'))
	    .pipe(rename({suffix: '.min'}))
	    .pipe(uglify())
	    .pipe(header(copyright))
	    .pipe(gulp.dest('dest/'));
})