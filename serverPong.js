const udpIO = require('./src/udp-io');
const udpSocket = require('dgram').createSocket('udp4');
const server = udpIO(udpSocket);

server.bind(33335);

server.on('MY_AWESOME_EVENT', (res, cb) => {
  console.log(res.question);
  cb({ answer: 'i\'m fine, thanx !' });
});
