global.quuxLoaded = true;
global.quuxTimeoutRan = false;
module.exports = {};
setTimeout(function() {
  console.log('TIMEOUT RAN!');
  global.quuxTimeoutRan = true;
}, 100);
