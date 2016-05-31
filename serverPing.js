const udpReqRes = require('./index');

const server = udpReqRes();

server.bind(33335);

server.send({ say: 'something' }, 33336).then((res) => {
  console.log(res);
});
