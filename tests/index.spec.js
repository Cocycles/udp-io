const udpIO = require('./../src/udp-io');
let udpServerMock;

const createUdpServer = (host, port) => {
  const server = udpIO(udpServerMock);
  server.bind(host, port);
  return server;
};


describe('udp-io', () => {
  beforeEach(() => {
    udpServerMock = {
      bind: jasmine.createSpy(),
      on: jasmine.createSpy(),
      send: jasmine.createSpy(),
    };
  });
  describe('#bind', () => {
    it('should call the udpServer with the host and port', () => {
      const host = 'www.mayTheUdpSocketsBeWithYou.com';
      const port = 42;
      const server = udpIO(udpServerMock);
      server.bind(host, port);
      expect(udpServerMock.bind).toHaveBeenCalledWith(host, port);
    });
  });

  // describe('#on', () => {
  //   it('should register a function for an incoming event type', () => {
  //     let sendUdpMockMessage;
  //
  //     udpServerMock.on = (msgType, fn) => {
  //       if (msgType === 'message') {
  //         sendUdpMockMessage = fn;
  //       }
  //     };
  //
  //     const eventType = 'the-force-has-been-used';
  //     const callback = jasmine.createSpy();
  //     const host = 'www.mayTheUdpSocketsBeWithYou.com';
  //     const port = 42;
  //     const server = createUdpServer(host, port);
  //     server.on(eventType, callback);
  //
  //     const response = {
  //       type: 'ping',
  //       eventType,
  //       msg: 'foo',
  //       uuid: '123598654',
  //     };
  //     const stringifiedResponse = JSON.stringify(response);
  //
  //     sendUdpMockMessage(stringifiedResponse);
  //     expect(callback).toHaveBeenCalledWith(response.msg, jasmine.any(Function));
  //   });
  // });
});
