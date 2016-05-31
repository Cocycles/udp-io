'use strict';

const dgram = require('dgram');
const uuid = require('node-uuid');

module.exports = () => {
  const server = dgram.createSocket('udp4');
  const pongCbs = {};
  const pingCbs = [];

  server.on('message', (response, rinfo) => {
    const parsedRes = JSON.parse(response.toString());

    if (parsedRes.type === 'pong' && !!pongCbs[parsedRes.uuid]) {
      pongCbs[parsedRes.uuid](parsedRes.msg);
      delete pongCbs[parsedRes.uuid];
    }

    if (parsedRes.type === 'ping') {
      pingCbs.forEach((cb) => {
        cb(parsedRes.msg, (data) => {
          const stringMessage = JSON.stringify({
            type: 'pong',
            msg: data,
            uuid: parsedRes.uuid,
          });

          server.send(
            stringMessage,
            0,
            stringMessage.length,
            rinfo.port,
            rinfo.address
          );
        });
      });
    }
  });

  return {
    bind(port, host) {
      server.bind(port, host);
    },

    send(msg, port, host) {
      host = host || '127.0.0.1';

      return new Promise((resolve, reject) => {
        const id = uuid.v4();
        pongCbs[id] = resolve;
        const stringMessage = JSON.stringify({ msg, uuid: id, type: 'ping' });
        server.send(
          stringMessage,
          0,
          stringMessage.length,
          port,
          host,
          reject
        );

        setTimeout(() => {
          delete pongCbs[uuid.v4()];
        }, 5000);
      });
    },

    on(cb) {
      pingCbs.push(cb);
    }
  };
};
