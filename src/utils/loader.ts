import * as loading from 'loading-cli';

const load = loading("loading text!!").start();

setTimeout(function () {
    load.color = 'yellow';
    load.text = ' Loading rainbows';
}, 2000)

// stop
setTimeout(function () {
    load.stop()
}, 3000)
