Packages["example-dvb"] = {
  "name": "example-dvb",
  "npmname": "ose-example-dvb",
  "caption": "DVB streamer example",
  "readme": "This example provides an DVB streamer to be used together with an\n[media player example] instance. In this example, a new entry\ncontrolling a dvblast is created.",
  "line": 37,
  "description": "",
  "usage": "## Usage\n\nFor the DVB streamer application to work, you need the following\nprerequisities: \n- Node.js and npm \n- dvblast\n\nIf you run Debian Jessie, just run:\n\n    sudo apt-get install dvblast\n\n\nStart the DVB streamer example as follows:\n\n    cd ose-example-dvb\n    ./bin/run.js",
  "modules": {
    "bin/run": {
      "name": "bin/run",
      "type": "module",
      "caption": "DVB streamer example startup script",
      "file": "bin/run.js"
    }
  }
};