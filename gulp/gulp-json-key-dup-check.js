var mapStream = require('map-stream');
var PluginError = require('gulp-util').PluginError;
var validator = require('json-dup-key-validator');

function gulpJsonValidator(option) {
  var allowDuplicatedKeys = false;
  if (option) {
    allowDuplicatedKeys = !!option.allowDuplicatedKeys;
  }
  var result = mapStream(function(file, cb) {
    var content = file.contents;
    var error;
    if (content) {
      var e = validator.validate(String(content), allowDuplicatedKeys);
      if (e &&e.toLocaleString().indexOf('-1')<0) {
        if(e.toLocaleString().indexOf('toString')>0) {
          console.log('| Please do not use "toString" as the Key, because it is json implied method name!! |');
        }
        console.log('| Please fix the bug in the internationalized json file for duplicate keys.     |');
        error = new PluginError('gulp-json-validator', {
          name: 'JSON Validate Error',
          filename: file.path,
          message: e
        });
      }
    }
    cb(error, file);
  });
  return result;
}

module.exports=gulpJsonValidator;
