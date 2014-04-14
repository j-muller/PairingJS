/*
 * PairingJS
 * PairingJS is a node.js application to pair a custom application with iTunes
 *
 * Copyright (c) 2013 Jeffrey Muller
 * Licensed under the MIT license.
 */

var mdns      = require('mdns2'),
    net       = require('net'),
    libdaap   = require('daap'),
    service   = new mdns.ServiceType('_touch-remote._tcp'),
    port      = 50508,
    txtRecord = {
        'DvNm': 'RemoteJS',
        'RemV': '10000',
        'DvTy': 'iPod',
        'RemN': 'Remote',
        'txtvers': '1',
        'Pair': 'D34DB33FD34DB33F'
    };

console.log('RemoteJS pairing process - jeffrey.muller92@gmail.com');
console.log('Thanks to http://jsharkey.org/blog/2009/06/21/itunes-dacp-pairing-hash-is-broken/'
            + ' - http://jinxidoru.blogspot.dk/2009/06/itunes-remote-pairing-code.html');

/* Advertise RemoteJS on the local network */
var ad = new mdns.Advertisement(service, port, {
    name: 'RemoteJS',
    txtRecord: txtRecord
}, function () {
    console.log('You can now type in your 4-digit pincode in iTunes.');
});
ad.start();

/*  Start TCP server to interact with iTunes */
var pairingBytes = new Buffer(
    [0x63, 0x6d, 0x70, 0x61, 0x00, 0x00, 0x00, 0x3a, 0x63, 0x6d, 0x70,
     0x67, 0x00, 0x00, 0x00, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
     0x00, 0x01, 0x63, 0x6d, 0x6e, 0x6d, 0x00, 0x00, 0x00, 0x16, 0x41,
     0x64, 0x6d, 0x69, 0x6e, 0x69, 0x73, 0x74, 0x72, 0x61, 0x74, 0x6f,
     0x72, 0xe2, 0x80, 0x99, 0x73, 0x20, 0x69, 0x50, 0x6f, 0x64, 0x63, 
     0x6d, 0x74, 0x79, 0x00, 0x00, 0x00, 0x04, 0x69, 0x50, 0x6f, 0x64]
);

/* Some extra support function for Buffer object */
Buffer.prototype.random = function (min, max) {
    return Math.floor((Math.random() * max) + min);
};

Buffer.prototype.toHexadecimal = function () {
    var result = '';
    var len = this.length;

    for (var i = 0; i < len; i++) {
        var byte = this.readUInt8(i).toString(16).toUpperCase();

        result += (byte.length < 2) ? '0' + byte : byte;
    }

    return result;
};

// JS implementation of Java nextBytes function
Buffer.prototype.nextBytes = function () {
    var len = this.length;

    for (var i = 0; i < len; i++) {
        this.writeUInt8(this.random(1, 255), i);
    }
};

// JS implementation of Java arraycopy function
Buffer.prototype.arraycopy = function(srcBuffer, srcPos, destPos, length) {
    srcBuffer.copy(this, destPos, srcPos, length);
};

var server = net.createServer(function (socket) {

    socket.on('data', function (data) {

        var code = new Buffer(8);

        code.nextBytes();
        pairingBytes.arraycopy(code, 0, 16, 8);

        var header = new Buffer("HTTP/1.1 200 OK\r\nContent-Length: " + pairingBytes.length + "\r\n\r\n");
        var reply = new Buffer(header.length + pairingBytes.length);

        reply.arraycopy(header, 0, 0, header.length);
        reply.arraycopy(pairingBytes, 0, header.length, pairingBytes.length);

        socket.write(reply);

        console.log('Your pairing guid is : 0x' + code.toHexadecimal());
        console.log('Have fun with RemoteJS ! :-)');

        /* Stop advertisement and server */
        server.close();
        ad.stop();

    });

}).listen(port);
