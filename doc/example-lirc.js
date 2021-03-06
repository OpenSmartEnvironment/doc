Packages["example-lirc"] = {
  "name": "example-lirc",
  "npmname": "ose-example-lirc",
  "caption": "LIRC example",
  "readme": "Extends the [media player example]. Allows to control\nthe media player with a IR remote controller via LIRC.",
  "line": 56,
  "features": "- Volume up, down and mute\n- Play, pause, stop\n- Activate the audio command group by pressing \"KEY_AUDIO\" and\n  select a predefined stream by pressing some digit\n- Activate the DVB by pressing \"KEY_TV\" command group and select a\n  predefined DVB channel by pressing some digit\n- Switch to previous or next channel by pressing the \"KEY_PREVIOUS\"\n  and \"KEY_NEXT\" keys.",
  "usage": "## Usage\n\nFor the LIRC example to work, you need the following:\n- LIRC-supported hardware\n- Configured and running LIRC daemon\n\nSee [Setting Up LIRC on the\nRaspberryPi](http://alexba.in/blog/2013/01/06/setting-up-lirc-on-the-raspberrypi/)\n\n\nTo install the example application, do the following:\n\n    git clone https://github.com/OpenSmartEnvironment/ose-example-lirc\n    cd ose-example-lirc\n    npm install\n\n\nTo configure this example, edit `ose-example-lirc/bin/run.js`.\nIf you wish to use this example together with the [Media player example],\nconfigure its IP address and port number.\n\n    player: 'ws://IP_ADDRESS:PORT'\n\n\nStart the LIRC example as follows:\n\n    ./ose-example-lirc/bin/run.js",
  "modules": {
    "bin/run": {
      "name": "bin/run",
      "type": "module",
      "caption": "LIRC example startup script",
      "readme": "This script starts OSE instance with configuration from config file.",
      "file": "bin/run.js"
    }
  }
};