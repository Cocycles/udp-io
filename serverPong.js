const udpReqRes = require('./index');

const server = udpReqRes();

server.on('event1', (res, cb) => {
  console.log('event1', res);
  cb({ foo: 'bar1' });
});

server.on('event2', (res, cb) => {
  console.log('event2', res);
  cb({ foo: 'bar2' });
});

server.bind(33336);
