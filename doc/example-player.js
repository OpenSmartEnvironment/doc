Packages["example-player"] = {
  "name": "example-player",
  "npmname": "ose-example-player",
  "caption": "Media player example",
  "readme": "This example is an Node.js media player application based on the\nOSE framework showcasing some of its principles and capabilities.",
  "line": 7,
  "description": "",
  "features": "- Playback of predefined streams, local files, items in history\n- Near-realtime synchronization among all front- and backend\n  instances\n- Playback through VLC\n- Volume control using PulseAudio\n- Integration with other example applications: ([DVB\n  streamer](#example-dvb), [LIRC](#example-lirc), [Raspberry\n  Pi](#example-rpi))",
  "usage": "## Usage\n\nFor the Media player application to work, you need the following prerequisities:\n- Node.js and npm\n- PulseAudio configured with the D-Bus control interface\n- VLC\n\nTo enable the PulseAudio dbus control interface, do:\n\n    pactl load-module module-dbus-protocol\n\nTo install the example application, do the following:\n\n    git clone https://github.com/OpenSmartEnvironment/ose-example-player\n    cd ose-example-player\n    npm install\n\n\nWhen asked for gaia-component version answer \"3\":\n\n    Unable to find a suitable version for gaia-component, please choose one:\n       1) gaia-component#~0.2.0 which resolved to 0.2.1 and is required by gaia-slider#796330f304, gaia-value-selector#8870b647c7\n       2) gaia-component#~0.3.0 which resolved to 0.3.5 and is required by gaia-button#0.0.4, gaia-checkbox#0.0.3, gaia-header#0.7.1, gaia-list#0.1.7, gaia-loading#84a8803886, gaia-pages#0.1.0, gaia-progress#02c312574a, gaia-sub-header#0.2.2, gaia-switch#4c28f022ca\n       3) gaia-component#~0.3.4 which resolved to 0.3.5 and is required by ose-gaia\n       4) gaia-component#~0.3.3 which resolved to 0.3.5 and is required by gaia-text-input#0.1.1\n\n    Prefix the choice with ! to persist it to bower.json\n\n    ? Answer: 3\n\n\nTo start the Media player example application, execute the startup script from an X.Org session.\n\n    ./bin/run.js\n\n\nTo access the [HTML5 frontend], open the following URL in Firefox\n37 or newer with the `dom.webcomponents.enabled` option enabled in\n`about:config`:\n\n    http://localhost:4431",
  "modules": {
    "bin/run": {
      "name": "bin/run",
      "type": "module",
      "caption": "Media player example startup script",
      "readme": "Main example application file",
      "file": "bin/run.js"
    },
    "data/streams": {
      "name": "data/streams",
      "type": "module",
      "caption": "Predefined media streams",
      "readme": "Personalize this file with your favourite streams.\n\nEach property of `exports` contains data of one media stream entry.",
      "file": "data/streams.js"
    }
  }
};