var quux = require('./baz/quux');
global.barLoaded = true;
global.barIntervalRan = false;
module.exports = {};
var interval = setInterval(function() {
  console.log('INTERVAL RAN!');
  global.barIntervalRan = true;
  clearInterval(interval);
}, 100);
