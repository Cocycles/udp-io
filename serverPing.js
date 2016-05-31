const udpReqRes = require('./index');

const server = udpReqRes();

server.bind(33335);

server.send('event1', { say: 'something' }, 33336).then((res) => {
  console.log(res);
});

server.send('event2', { say: 'something else' }, 33336).then((res) => {
  console.log(res);
});
