var gulp = require('gulp');
var runSequence =require('run-sequence');
var through = require('through2');
var rimraf = require('gulp-rimraf');
var validator = require('json-dup-key-validator');
var jsonKeyDupCheck = require('./gulp-json-key-dup-check');
var merge = require('gulp-merge-json');
var replace = require('gulp-replace');

gulp.task('i18n-json-key-dup-check', function() {
  return gulp.src('./i18n/*.json')
    .pipe(through.obj(function(file, enc, cb){
      this.push(file);
      cb();
    }))
    .pipe(jsonKeyDupCheck({ allowDuplicatedKeys: false }));
});

gulp.task('i18n-chinese-check', function() {
  return gulp.src('./i18n/en_*.json')
    .pipe(through.obj(function(file, enc, cb){
      const { contents } = file;
      for (var i = 0; i < contents.length; i++) {
        //console.log("i=" + i + ", value=" + String.fromCharCode(contents[i]));
        if(contents[i]>127) {
          console.log("--------------------------------------------------------------------------------");
          console.log("" +file.path +"                                                                 ");
          console.log("  当前文件存在中文字符!  ");
          console.log("--------------------------------------------------------------------------------");
          break
        }
      }
      this.push(file);
      cb();
    }))
});

gulp.task('i18n-json-merge-watch',function(){
  gulp.watch('./i18n/*.json',function () {
    runSequence('i18n-json-merge');
  });
  setTimeout(function () {
    console.log('\n');
  });
});

gulp.task('i18n-json-merge',function(){
  runSequence(
    'i18n-json-clean',
    'i18n-zh-json-merge',
    'i18n-en-json-merge'
  );
});

gulp.task('i18n-json-clean', function() {
  return gulp.src('./i18n/*.json', { read: false })
    .pipe(rimraf({ force: true }));
});

gulp.task('i18n-zh-json-merge',function(){
  gulp.src('./i18n/zh*.json')
    .pipe(merge({fileName: 'zh.json'}))
    .pipe(gulp.dest('./i18n/'));
});

gulp.task('i18n-en-json-merge',function(){
  gulp.src('./i18n/en*.json')
    .pipe(merge({fileName: 'en.json'}))
    .pipe(gulp.dest('./i18n/'));
});

gulp.task('use-openlab-style-config', function(){
  gulp.src(['./config.less'])
    .pipe(replace('config-common', 'config-for-show'))
    .pipe(gulp.dest('./css'));
});

gulp.task('revert-style-config', function(){
  gulp.src(['./config.less'])
    .pipe(replace('config-for-show', 'config-common'))
    .pipe(gulp.dest('./css'));
});
