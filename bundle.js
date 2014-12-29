Packages["bundle"] = {
  "name": "bundle",
  "npmname": "ose-bundle",
  "caption": "Bundle",
  "readme": "This package wraps all official OSE packages, contains examples and\nallows documentation building.",
  "file": "lib/entry/index.js",
  "line": 14,
  "comps": {
    "lirc": {
      "name": "lirc",
      "caption": "LIRC example",
      "readme": "Extends the [media player example]. Allows to control\nthe media player with a IR remote controller via LIRC.\n\nIn this example, the remote controller behaviour is configured as follows:\n- Volume up, down and mute\n- Play, pause, stop\n- Activate the audio command group by pressing \"KEY_AUDIO\" and\n  select a predefined stream by pressing some digit\n- Activate the DVB by pressing \"KEY_TV\" command group and select a\n  predefined DVB channel by pressing some digit\n- Switch to previous or next channel by pressing the \"KEY_PREVIOUS\"\n  and \"KEY_NEXT\" keys.\n\nYou can configure the behaviour to suit your needs.",
      "file": "examples/lirc/run.js",
      "line": 57,
      "description": "## Prerequisites\n\nThe first thing you need is a working OSE installation. The easiest\nway of obtaining one is to install the\n[ose-bundle](https://github.com/OpenSmartEnvironment/ose-bundle#installation)\npackage. It is also possible to install only the required OSE\npackages either through npm or by cloning their GitHub\nrepositories.\n\nFor the LIRC example to work, you need the following:\n- LIRC-supported hardware\n- Configured and running LIRC daemon\n\nSee [Setting Up LIRC on the\nRaspberryPi](http://alexba.in/blog/2013/01/06/setting-up-lirc-on-the-raspberrypi/)\n\n\n## Getting it to run\n\nTo start the example from shell:\n\n    cd node_modules/ose-bundle/examples/lirc\n    ./run.js",
      "modules": {
        "examples/lirc/config": {
          "name": "examples/lirc/config",
          "type": "module",
          "caption": "LIRC example configuration",
          "readme": "OSE is configured by a configuration object, `module.exports` in\nthis case. Each property of this object defines the configuration\nfor one [OSE plugin].",
          "file": "examples/lirc/config.js"
        },
        "examples/lirc/lirc": {
          "name": "examples/lirc/lirc",
          "type": "module",
          "caption": "Example LIRC remote controller configuration",
          "readme": "Personalize this file depending on your remote controller and LIRC\nsetup.",
          "file": "examples/lirc/lirc.js"
        },
        "example/lirc": {
          "name": "example/lirc",
          "type": "module",
          "caption": "LIRC example startup script",
          "readme": "This script starts OSE instance with configuration from config file.",
          "file": "examples/lirc/run.js"
        }
      }
    },
    "media": {
      "name": "media",
      "caption": "Media player example",
      "readme": "This example is an stand-alone application based on the OSE\nframework, showcasing some of its principles and capabilities. This\napplication works as a currently half-featured media player and\nremote control on Linux boxes. The example application has the\nfollowing features:\n\n- Node.js backend\n- Control via HTML5 frontend instances\n- Near-realtime synchronization among all front- and backend\n  instances\n- Keyboard and pointer remote control using xdotool\n- Playback of different media using VLC\n- Predefined media streams\n- Icecast directory search and playback\n- Youtube search and playback\n- Local files playback\n- Playback from history\n\nOther example applications consisting of multiple instances working\nas a single whole are coming.",
      "file": "examples/media/streams.js",
      "line": 7,
      "description": "## Prerequisites\nThe first thing you need is a working OSE installation. The easiest\nway of obtaining one is to install the\n[ose-bundle](https://github.com/OpenSmartEnvironment/ose-bundle#installation)\npackage. It is also possible to install only the required OSE\npackages either through npm or by cloning their GitHub\nrepositories.\n\nFor the Media player application to work, you need the following:\n- PulseAudio configured with the D-Bus control interface\n- Python 3\n- VLC\n\nIf you run Debian Jessie, just run:\n\n    sudo apt-get install pulseaudio python3 vlc\n\nTo enable the dbus control interface, do:\n\n    pactl load-module module-dbus-protocol\n\n\n## Getting it to run\n\nTo start the Media player example application, change to the installation\ndirectory and execute the startup script from an X.Org session. To\nrun the example from outside an X.Org session (in a console or\nthrough ssh), export the display variable in the shell:\n\n    export DISPLAY=\":0.0\"\n\nTo start the application from the shell:\n\n    cd node_modules/ose-bundle/examples/media\n    ./run.js\n\nTo access the [HTML5 frontend], open the following URL in a\n[supported browser](../modules/ose.html#platforms).\n\n    http://localhost:4431",
      "modules": {
        "examples/media/config": {
          "name": "examples/media/config",
          "type": "module",
          "caption": "Media player example configuration",
          "readme": "OSE is configured by a configuration object, `module.exports` in\nthis case. Each property of this object defines the configuration\nfor one [OSE plugin].",
          "file": "examples/media/config.js"
        },
        "examples/media/channels": {
          "name": "examples/media/channels",
          "type": "module",
          "caption": "Predefined DVB channels",
          "readme": "Personalize this file with your favourite channels.\n\nEach property of `exports` contains data of one DVB channel entry.\n\nSee the [linuxtv.org\nWiki](http://www.linuxtv.org/wiki/index.php/Frequency_scan) for\ninformation on how to obtain channel data.",
          "file": "examples/media/dvb.js"
        },
        "example/media": {
          "name": "example/media",
          "type": "module",
          "caption": "Media player startup script",
          "readme": "This scripts starts OSE instance with configuration from config file.",
          "file": "examples/media/run.js"
        },
        "examples/media/streams": {
          "name": "examples/media/streams",
          "type": "module",
          "caption": "Predefined media streams",
          "readme": "Personalize this file with your favourite streams.\n\nEach property of `exports` contains data of one media stream entry.",
          "file": "examples/media/streams.js"
        }
      }
    },
    "rpi": {
      "name": "rpi",
      "caption": "Raspberry Pi example",
      "readme": "This application allows to control features of the Raspberry Pi. It\ncan be used on its own or together with other example OSE\napplications.",
      "file": "examples/rpi/run.js",
      "line": 53,
      "description": "## Prerequisites\nThe first thing you need is a working OSE installation. The easiest\nway of obtaining one is to install the\n[ose-bundle](https://github.com/OpenSmartEnvironment/ose-bundle#installation)\npackage. It is also possible to install only the required OSE\npackages either through npm or by cloning their GitHub\nrepositories.\n\nFor information on how to control all GPIO pins without root access,\nsee eg. [this\nhowto](http://www.raspberrypi.org/forums/viewtopic.php?f=44&t=8999).\n\n\n## Getting it to run\n\nChange to the example application's directory:\n\n    cd node_modules/ose-bundle/examples/rpi\n\nRun the `exports` script to export as root one input and one output GPIO\npin to make them accessible without root permissions.\n\n    sudo ./export\n\nRun the example application:\n\n    ./run.js\n\nTo access the [HTML5 frontend], open the following URL in a\n[supported browser](../modules/ose.html#platforms).\n\n    http://localhost:4431",
      "modules": {
        "examples/rpi/config": {
          "name": "examples/rpi/config",
          "type": "module",
          "caption": "Raspberry Pi example configuration",
          "readme": "OSE is configured by an configuration object, `module.exports` in\nthis case. Each property of this object defines the configuration\nfor one [OSE plugin].",
          "file": "examples/rpi/config.js"
        },
        "example/rpi": {
          "name": "example/rpi",
          "type": "module",
          "caption": "Raspberry Pi example startup script",
          "readme": "This script starts an OSE instance with configuration from\nconfig.js.",
          "file": "examples/rpi/run.js"
        }
      }
    }
  },
  "modules": {
    "Gruntfile": {
      "name": "Gruntfile",
      "type": "module",
      "caption": "Gruntfile",
      "readme": "",
      "file": "Gruntfile.js"
    },
    "doc": {
      "name": "doc",
      "type": "module",
      "caption": "Documentation build script",
      "readme": "To build complete documentation, go to the `bundle` directory and run:\n\n    grunt docs",
      "file": "doc.js"
    }
  },
  "quick": {
    "about": "The main advantage of OSE is the easy creation of applications\nconsisting of multiple instances working as a single whole. The\nobjective is to develop an all-encompassing personal mesh running\nvarious devices including HTPCs, phones, tablets, workstations,\nservers, Raspberry Pis, home automation gadgets, wearables, drones etc.",
    "status": "- Pre-alpha stage (insecure and buggy)\n- Unstable API\n- Gaps in the documentation\n- No test suite\n\nThis is not yet a piece of download-and-use software. Its important\nto understand the basic principles covered by the\n[documentation](http://opensmartenvironment.github.io/doc/).\n\nUse of this software is currently recommended only for users that\nwish participate in the development process, see\n[contributions](http://opensmartenvironment.github.io/doc/#contrib).",
    "install": "# Installation\n\n## Node.js\nThe main prerequisite is a working installation of a recent\ninstallation of\n[Node.js](https://github.com/joyent/node/wiki/installing-node.js-via-package-manager)\n(>= 0.10).\n\nOn Debian Jessie, you can install the default package:\n\n    sudo apt-get install nodejs\n\nOn Raspbian, install Node.js by doing:\n\n    wget http://node-arm.herokuapp.com/node_latest_armhf.deb\n    sudo dpkg -i node_latest_armhf.deb\n\n\n## OSE Bundle Prerequisites\n\nYou also need the following prerequisites\n\n- The libdbus-1-dev package or its equivalent for your distribution\n- The pkg-config package or its equivalent in your distribution\n\nIf you run Debian Jessie, just run:\n\n    sudo apt-get install libdbus-1-dev pkg-config\n\n\n## OSE Bundle Installation\nThe easiest way of getting a working OSE installation is to install\nthe [ose-bundle] package using npm:\n\n    npm install ose-bundle\n\nThe \"ose-bundle\" package contains all official OSE packages as its\ndependencies.\n\n\n## Manual installation of OSE packages\nInstead of using npm, you can install OSE packages by cloning their\nGitHub repositories. You can thus install only the packages that\nyou actually need.\n\nTODO: Expand on this.",
    "licence": "This software is released under the terms of the [GNU General\nPublic License v3.0](http://www.gnu.org/copyleft/gpl.html) or\nlater.",
    "contrib": "# Contributions\nTo get started contributing or coding, it is good to read about the\ntwo main npm packages [ose] and [ose-bb].\n\nThis software is in the pre-alpha stage. At the moment, it is\npremature to file bugs. Input is, however, much welcome in the form\nof ideas, comments and general suggestions.  Feel free to contact\nus via\n[github.com/opensmartenvironment](https://github.com/opensmartenvironment).",
    "aboutDoc": "# About the documentation\n\n## State of documentation\nThis documentation is currently under construction and being\ncontinuously improved. Links may be broken and information\nincomplete or erroneous.\n\n\n## Packages and components\nOSE documentation is compiled from source files of all official OSE\nnpm packages.\n\nEach package consists of components. Component is some logical\nconcept coded into modules. Each package description contains basic\ninformation about the package, its components and modules not\nassigned to any component.\n\nEach component description contains basic information about the\ncomponent and its modules.\n\n\n## Modules\nModules are source files (mostly JavaScript files conforming to the CommonJS\nModules spec).\n\nThe module view is a reference of methods, properties and events\nprovided by the module.\n\nA module can be one of the following:\n- simple module with exported methods and properties\n- class definition\n- singleton\n- package core module",
    "platforms": "OSE is developed in JavaScript on the following platforms.\n- Node.js (>0.10) running on Debian Jessie and Raspbian\n- recent versions of Firefox\n- recent versions of Chromium/Chrome\n\nIt, however, probably also runs on other recent browsers and Linux\ndistributions."
  }
};