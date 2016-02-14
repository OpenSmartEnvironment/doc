Packages["example-dvb"] = {
  "name": "example-dvb",
  "npmname": "ose-example-dvb",
  "caption": "DVB streamer example",
  "readme": "This example provides a DVB streamer to be used together with the\n[media player example].",
  "line": 47,
  "features": "- streaming using [DVBlast](http://www.videolan.org/projects/dvblast.html)\n- unicast streaming of single channels\n- multicast streaming of all channels in a single multiplex",
  "usage": "## Usage\n\nFor the DVB streamer application to work, you need the following\nprerequisites:\n- Node.js and npm\n- DVBlast\n\nTo install the example application, do the following:\n\n    git clone https://github.com/OpenSmartEnvironment/ose-example-dvb\n    cd ose-example-dvb\n    npm install\n\n\nTo configure this example, edit `ose-example-dvb/bin/run.js`.\nIf you wish to use this example together with the [Media player example],\nconfigure its IP address and port number.\n\n    player: 'ws://IP_ADDRESS:PORT'\n\n\nStart the DVB streamer example as follows:\n\n    ./ose-example-dvb/bin/run.js",
  "modules": {
    "bin/run": {
      "name": "bin/run",
      "type": "module",
      "caption": "DVB streamer example startup script",
      "file": "bin/run.js"
    }
  }
};