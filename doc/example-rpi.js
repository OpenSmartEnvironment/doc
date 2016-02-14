Packages["example-rpi"] = {
  "name": "example-rpi",
  "npmname": "ose-example-rpi",
  "caption": "Raspberry Pi example",
  "readme": "This application allows to control features of the Raspberry Pi. It\ncan be used on its own or together with other example OSE\napplications, see [Media player example].",
  "line": 56,
  "features": "- GPIO digital input/output (light, switch, heater)\n- taking pictures using `raspistill`",
  "usage": "## Usage\n\nFor the Raspberry Pi example application to work, you need the following prerequisites:\n- Node.js > 0.12, npm, git\n\nTo install the example application, do the following:\n\n    git clone https://github.com/OpenSmartEnvironment/ose-example-rpi\n    cd ose-example-rpi\n    npm install\n\nInstalling dependencies can take some time.\n\nIf you want to use this example on a BeagleBone, see [these\ninstructions](https://github.com/fivdi/onoff#installation).\n\nTo configure this example, edit `ose-example-rpi/bin/run.js`.\nIf you wish to use this example together with the [Media player example],\nconfigure its IP address and port number.\n\n    player: 'ws://IP_ADDRESS:PORT'\n\n\nStart the Raspberry Pi example as follows:\n\n    ./ose-example-rpi/bin/run.js\n\n\nTo access the [HTML5 frontend], open the following URL in [supported browser]\n\n    http://localhost:4432",
  "modules": {
    "bin/run": {
      "name": "bin/run",
      "type": "module",
      "caption": "Raspberry Pi example startup script",
      "file": "bin/run.js"
    }
  }
};