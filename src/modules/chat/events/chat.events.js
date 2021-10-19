const {EventEmitter} = require('events');
const socketIO = require('socket.io');
const emitter = new EventEmitter();

module.exports = {emitter}
