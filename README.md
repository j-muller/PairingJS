PairingJS
=========

PairingJS is a node.js application to pair a custom application with iTunes. This tool has been tested with iTunes 11 & iTunes 12, both running under Mac OS X. Should be running under Windows, as well, but not tested yet.

###How to use

```
koinkoin:~/PairingJS jeffrey$ node pairing.js 
RemoteJS pairing process - jeffrey.muller92@gmail.com
Thanks to http://jsharkey.org/blog/2009/06/21/itunes-dacp-pairing-hash-is-broken/ - http://jinxidoru.blogspot.dk/2009/06/itunes-remote-pairing-code.html
You can now type in your 4-digit pincode in iTunes.
Your pairing guid is : 0xF4CA6A5B218B71E8
Have fun with RemoteJS ! :-)
```

###Inspiration

Thanks to 

* http://jsharkey.org/blog/2009/06/21/itunes-dacp-pairing-hash-is-broken/
* http://jinxidoru.blogspot.dk/2009/06/itunes-remote-pairing-code.html

for their explanation about this DAAP protocol feature. Dive into the code to understand how it works. :-)

###License

PairingJS is freely distributable under the terms of the MIT license.

```
Copyright (c) 2014 Jeffrey Muller <jeffrey.muller92@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```