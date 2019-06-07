index.js:

var main = require('./main');
module['exports'] = function (server) {
  test(server);
};


main.js:

module['exports'] = function (server) {
  'use strict';
  var _ = require("underscore");
  var _db = require('underscore-db');
  var UUID = function UUID() {
    var s = [],
      itoh = '0123456789ABCDEF';

    // Make array of random hex digits. The UUID only has 32 digits in it, but we
    // allocate an extra items to make room for the '-'s we'll be inserting.
    for (var i = 0; i < 36; i++) {
      s[i] = Math.floor(Math.random() * 0x10);
    }

    // Conform to RFC-4122, section 4.4
    s[14] = 4; // Set 4 high bits of time_high field to version
    /*jslint bitwise: true */
    s[19] = (s[19] & 0x3) | 0x8; //  Specify 2 high bits of clock sequence
    /*jslint bitwise: false */

    // Convert to hex chars
    for (var j = 0; j < 36; j++) {
      s[j] = itoh[s[j]];
    }

    // Insert '-'s
    s[8] = s[13] = s[18] = s[23] = '-';

    return s.join('');
  };

  _.mixin(_db);

  // <!--=============================================================================================-->
  // <!-------------------------------------------公共接口----------------------------------------------->
  // <!--=============================================================================================-->
  server.use(
    function crossOrigin(req, res, next) {
      'use strict';
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      return next();
    }
  );

  server.get("/api/sessions", function (req, res, next) {
    var result = {};
    res.send(result)
    next()
  });

};

