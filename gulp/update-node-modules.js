var Rsync = require('rsync');
var RsyncPid;
var deleExec = require('child_process').exec;
var tarGzExec = require('child_process').exec;

//when the error is occur the call this funcion to kill the process
var quitting = function() {
  if (RsyncPid) {
    RsyncPid.kill();
  }
  process.exit();
};

process.on('SIGINT', quitting); // run signal handler on CTRL-C
process.on('SIGTERM', quitting); // run signal handler on SIGTERM
process.on('exit', quitting); // run signal handler when main process exits


function copyFile(done) {
  var isNeedCopy = false;
  const cmd = new Rsync()
    .flags('avzp') //ip:/opt/node_modules.tar.gz
    .source('ip::node_modules_rsync_server/node_modules.tar.gz')
    .destination('./node_modules.tar.gz')
    .progress();

  RsyncPid = cmd.execute(function (error , code , cmd ) {
    if(isNeedCopy) {
      console.log('download the lastest node_modules.tar.gz compvare');

      deleExec('mv node_modules.tar.gz node_modules.tar.gz&&rm -fr ./node_modules', function(e , stdout , stderr ) {
        console.log('remove local node_modules dir compvare');
        if(!e) {
          console.log('begin to tar the the node_modules.tar.gz,please wait at most 1 min... !');
          tarGzExec('tar zxf ./node_modules.tar.gz && mv node_modules.tar.gz node_modules.tar.gz', function(e , stdout , stderr ) {
            console.log('tar the node_modules.tar.gz compvare');
            // done();
          });
        }
      });
    } else {
      // done();
    }
  }, function(progress ) {
    if(progress.toString().trim() === 'node_modules.tar.gz') {
      isNeedCopy = true;
      console.log('begin to download the lastest node_modules.tar.gz from the remote server...');
    }
    if(isNeedCopy) {
      console.log(progress.toString());
    }
  });
}

function execute(someFunction) {
  someFunction();
}

execute(copyFile);


