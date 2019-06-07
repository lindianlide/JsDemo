
const ndpsServer = require('ndps');
const mockServer = require('./mock');
let proxies, proxyTarget, isEnableNDPS, ndpsConf, proxyConf, isMockStarted;
/**
 * 【后端环境列表】在此处设置常用的后端环境
 ************************************************************************/
proxies = /*proxies*/{
  0: 'http://localhost:8181'
}/*proxies*/;

/**
 * 【目标后端环境】在此处选择你需要的后端环境
 ************************************************************************/

proxyTarget = proxies[ 0 ];


/**
 * 【NDPS功能开关】在此处设置是否开启动态代理
 ************************************************************************/
isEnableNDPS = false;

/**
 * 【代理配置】NDPS和cli dev-server的代理配置
 ************************************************************************/
ndpsConf = {
  ndpsPort: 8001,
  proxiesAnchor: '/*proxies*/',
  proxyIdxAnchor: 'proxies[',
  proxyConfPath: __filename,
  beforeProxyChange: (info, done) => {
    if (info.proxyIdx === 0 && !isMockStarted) {
      mockServer(!info.isInit, () => done());
      isMockStarted = true;
    } else {
      done();
    }
  }
};

proxyConf = [{
  context: ["/api"],
  target: proxyTarget,
  secure: false
}];

/**
 * 【打印输出】打印和输出上面的代理配置
 ************************************************************************/
if (process.argv[1].indexOf('proxy.conf.js') > -1) {
  if (process.argv[2] === 'ndps' || isEnableNDPS) {
    ndpsServer(ndpsConf);
  } else if (proxyTarget === proxies[0]) {
    mockServer(false);
  }
} else {
  let logMsg = '';
  if (isEnableNDPS) {
    logMsg = 'The NDPS(Node-Dynamic-Proxy-Server) is Enabled!';
    proxyConf[0].target = `http://localhost:${ndpsConf.ndpsPort}`;
  } else {
    logMsg = `The Http-Proxy target is: ${proxyTarget}`;
  }
  module.exports = proxyConf;
}

