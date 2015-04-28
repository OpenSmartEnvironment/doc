Packages["example-rpi"] = {
  "name": "example-rpi",
  "npmname": "ose-example-rpi",
  "caption": "Raspberry Pi example",
  "readme": "This application allows to control features of the Raspberry Pi. It\ncan be used on its own or together with other example OSE\napplications, see [Media player example].",
  "line": 9,
  "features": "- GPIO digital input/output (light, switch, heater)\n- taking pictures using `raspistill`",
  "usage": "## Usage\n\nFor the Raspberry Pi example application to work, you need the following prerequisites:\n- Node.js > 0.10, npm, git\n- bower<br>\n  `sudo npm install -g bower`\n\nTo install the example application, do the following:\n\n    git clone https://github.com/OpenSmartEnvironment/ose-example-rpi\n    cd ose-example-rpi\n    npm install\n\nIf you want to use this example on a BeagleBone, see [these\ninstructions](https://github.com/fivdi/onoff#installation).\n\nIf you wish to use this example together with the OSE Media player,\nconfigure its IP address and port number within your network in\n`bin/run.js`.\n\n    player: 'ws://[ip address]:[port]'\n\nStart the Raspberry Pi example as follows:\n\n    ./bin/run.js\n\n\nTo access the [HTML5 frontend], open the following URL in Firefox\n**37 or newer** (Iceweasel in Debian Jessie is too old).<br>\n**Before opening the link, enable the `dom.webcomponents.enabled`\noption in `about:config`.**\n\n    http://localhost:4432\n\n\n### Known bug: \n\nIf you see the following error, just restart `./bin/run.js`.\n\n    ha> ========================================================\n    1430212384 'ERROR | ose | EPERM |' 'EPERM, write'\n    Stack Trace:\n    Error: EPERM, write\n        at Error (native)\n    --------------------------------------------------------\n    Logged at:\n    Trace\n        at Object.exports.error.exports.err (/home/pi/ose-example-rpi/node_modules/ose/lib/logger.js:276:11)\n        at Object.exports.error (/home/pi/ose-example-rpi/node_modules/ose/lib/link.js:594:11)\n        at /home/pi/ose-example-rpi/node_modules/ose-control/lib/pin/dout.js:106:14\n        at /home/pi/ose-example-rpi/node_modules/ose-rpi/lib/rpi/node.js:286:7\n        at FSReqWrap.strWrapper (fs.js:570:5)\n    ========================================================",
  "modules": {
    "bin/run": {
      "name": "bin/run",
      "type": "module",
      "caption": "Raspberry Pi example startup script",
      "file": "bin/run.js"
    }
  }
};