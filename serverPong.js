const udpReqRes = require('./index');

const server = udpReqRes();

server.on((res, cb) => {
  console.log(res);
  cb({ foo: 'bar' });
});
server.bind(33336);
