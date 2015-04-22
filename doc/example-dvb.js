Packages["example-dvb"] = {
  "name": "example-dvb",
  "npmname": "ose-example-dvb",
  "caption": "DVB streamer example",
  "readme": "This example provides a DVB streamer to be used together with an\n[media player example] instance. In this example, a new entry\ncontrolling a DVBlast is created.",
  "line": 37,
  "usage": "## Usage\n\nFor the DVB streamer application to work, you need the following\nprerequisities: \n- Node.js and npm \n- DVBlast\n\nTo install the example application, do the following:\n\n    git clone https://github.com/OpenSmartEnvironment/ose-example-dvb\n    cd ose-example-dvb\n    npm install\n\n\nStart the DVB streamer example as follows:\n\n    ./bin/run.js",
  "modules": {
    "bin/run": {
      "name": "bin/run",
      "type": "module",
      "caption": "DVB streamer example startup script",
      "file": "bin/run.js"
    }
  }
};