# udp-reqres

> easy request response pattern for udp sockets, using nodejs dgram module.

A nicer interface to the built-in [`dgram`](http://nodejs.org/api/dgram.html) module.

## Install

```
$ npm install --save udp-reqres
```

## Usage
you need to have two node servers, which every server opens a udp socket, define in the `bind` method. the two servers can be both "client" and "server" in the request resonse pattern.

on your "server" you need to define an event, you do this with the method `on`, with the name of the event and a function. you do whatever you want and then use the callback to send the payload back to request.

on the "client" you can use the method `send` with an event name, payload, port and host.
this method returns an es6 Promise with the result from the "server".

## Example
###### server
```js
//on the "server"

const udpReqRes = require('./src/udp-reqres');
const udpSocket = require('dgram').createSocket('udp4');
const server = udpReqRes(udpSocket);

server.bind(33335);

server.on('MY_AWESOME_EVENT', (res, cb) => {
  console.log(res.question);
  cb({ answer: 'i\'m fine, thanx !' });
});
```
###### client
```js
//on the "client"

const udpReqRes = require('./src/udp-reqres');
const udpSocket = require('dgram').createSocket('udp4');
const server = udpReqRes(udpSocket);

server.bind(33334);

server.send('MY_AWESOME_EVENT', { question: 'how are you ?' }, 33335).then((res) => {
  console.log(`answer: ${res.answer}`);
});
```

## API

#### server.bind(port, host)
  binds the server to `port` and `host`, the host is default to localhost

#### server.on(eventName, fn(req, cb))
  register an event, `eventName` is a string and the function gets a request object and a callback, call the callback to send the message back.

#### server.send(eventName, payload, port, host)
  send an event to a certain host, returns an es6 Promise.
  `eventName` is a string and `host` is default to localhost.

## License
MIT
