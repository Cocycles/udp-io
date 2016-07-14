const udpIO = require('./src/udp-io');
const udpSocket = require('dgram').createSocket('udp4');
const server = udpIO(udpSocket);

server.bind(33334);

server.send('MY_AWESOME_EVENT', { question: 'how are you ?' }, 33335).then((res) => {
  console.log(`answer: ${res.answer}`);
});
