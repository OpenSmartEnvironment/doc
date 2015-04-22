Packages["example-rpi"] = {
  "name": "example-rpi",
  "npmname": "ose-example-rpi",
  "caption": "Raspberry Pi example",
  "readme": "This application allows to control features of the Raspberry Pi. It\ncan be used on its own or together with other example OSE\napplications, see [Media player example].",
  "line": 9,
  "usage": "## Usage\n\nTo install the example application, do the following:\n\n    git clone https://github.com/OpenSmartEnvironment/ose-example-rpi\n    cd ose-example-rpi\n    npm install\n\n\nIf you want to use this example on a BeagleBone, see [these\ninstructions](https://github.com/fivdi/onoff#installation).\n\n\nStart the Raspberry Pi example as follows:\n\n    ./bin/run.js\n\n\nTo access the [HTML5 frontend], open the following URL in Firefox\n37 or newer with the `dom.webcomponents.enabled` option enabled in\n`about:config`:\n\n    http://localhost:4432",
  "modules": {
    "bin/run": {
      "name": "bin/run",
      "type": "module",
      "caption": "Raspberry Pi example startup script",
      "file": "bin/run.js"
    }
  }
};