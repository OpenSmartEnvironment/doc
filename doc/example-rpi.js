Packages["example-rpi"] = {
  "name": "example-rpi",
  "npmname": "ose-example-rpi",
  "caption": "Raspberry Pi example",
  "readme": "This application allows to control features of the Raspberry Pi. It\ncan be used on its own or together with other example OSE\napplications, see [Media player example].",
  "line": 9,
  "usage": "## Usage\n\nTo install the example application, do the following:\n\n    git clone https://github.com/OpenSmartEnvironment/ose-example-rpi\n    cd ose-example-rpi\n    npm install\n\n\nWhen asked for gaia-component version answer \"3\":\n\n    Unable to find a suitable version for gaia-component, please choose one:\n       1) gaia-component#~0.2.0 which resolved to 0.2.1 and is required by gaia-slider#796330f304, gaia-value-selector#8870b647c7\n       2) gaia-component#~0.3.0 which resolved to 0.3.5 and is required by gaia-button#0.0.4, gaia-checkbox#0.0.3, gaia-header#0.7.1, gaia-list#0.1.7, gaia-loading#84a8803886, gaia-pages#0.1.0, gaia-progress#02c312574a, gaia-sub-header#0.2.2, gaia-switch#4c28f022ca\n       3) gaia-component#~0.3.4 which resolved to 0.3.5 and is required by ose-gaia\n       4) gaia-component#~0.3.3 which resolved to 0.3.5 and is required by gaia-text-input#0.1.1\n\n    Prefix the choice with ! to persist it to bower.json\n\n    ? Answer: 3\n\n\nIf you want to use this example on a BeagleBone, see [these\ninstructions](https://github.com/fivdi/onoff#installation).\n\n\nStart the Raspberry Pi example as follows:\n\n    ./bin/run.js\n\n\nTo access the [HTML5 frontend], open the following URL in Firefox\n37 or newer with the `dom.webcomponents.enabled` option enabled in\n`about:config`:\n\n    http://localhost:4432",
  "modules": {
    "bin/run": {
      "name": "bin/run",
      "type": "module",
      "caption": "Raspberry Pi example startup script",
      "file": "bin/run.js"
    }
  }
};