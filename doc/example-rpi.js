Packages["example-rpi"] = {
  "name": "example-rpi",
  "npmname": "ose-example-rpi",
  "caption": "Raspberry Pi example",
  "readme": "This application allows to control features of the Raspberry Pi. It\ncan be used on its own or together with other example OSE\napplications.",
  "file": "lib/din/pin.js",
  "line": 9,
  "description": "## Installation\n\nTo install the example application, do one of the following:\n\n    npm install ose-example-player\n\nor\n   \n    git clone https://github.com/OpenSmartEnvironment/ose-example-player\n\n\nIf you want to use this example on a BeagleBone, see [these\ninstructions](https://github.com/fivdi/onoff#installation).\n\n\nTo start the application from the install directory:\n\n    cd ose-example-rpi\n    ./bin/run.js\n\n\nTo access the [HTML5 frontend], open the following URL in Firefox\n37 or newer with the `dom.webcomponents.enabled` option enabled in\n`about:config`:\n\n    http://localhost:4432",
  "modules": {
    "bin/run": {
      "name": "bin/run",
      "type": "module",
      "caption": "Raspberry Pi example startup script",
      "file": "bin/run.js"
    }
  }
};