Packages["example-player"] = {
  "name": "example-player",
  "npmname": "ose-example-player",
  "caption": "Media player example",
  "readme": "This example is an Node.js media player application based on the\nOSE framework showcasing some of its principles and capabilities.",
  "line": 65,
  "features": "- Playback of predefined streams, local files, items in history\n- Near-realtime synchronization among all front- and backend\n  instances\n- Playback through VLC\n- Volume control using PulseAudio\n- Integration with other example applications: ([DVB\n  streamer](#example-dvb), [LIRC](#example-lirc), [Raspberry\n  Pi](#example-rpi))",
  "usage": "## Usage\n\nFor the Media player application to work, you need the following prerequisities:\n- Node.js and npm\n- PulseAudio configured with the D-Bus control interface\n- VLC 2.2 or newer\n\nTo enable the PulseAudio dbus control interface, do:\n\n    pactl load-module module-dbus-protocol\n\nTo install the example application, do the following:\n\n    git clone https://github.com/OpenSmartEnvironment/ose-example-player\n    cd ose-example-player\n    npm install\n\n\nTo start the Media player example application, execute the startup script from an X.Org session.\n\n    ./bin/run.js\n\n\nTo access the [HTML5 frontend], open the following URL in Firefox\n37 or newer. (Iceweasel in Debian Jessie is too old.)\n\n<b>Enable the `dom.webcomponents.enabled` option in `about:config`:</b>\n\n    http://localhost:4431",
  "modules": {
    "data/streams": {
      "name": "data/streams",
      "type": "module",
      "caption": "Predefined media streams",
      "readme": "Personalize this file with your favourite streams.\n\nEach property of `exports` contains data of one media stream entry.",
      "file": "data/streams.js"
    },
    "bin/run": {
      "name": "bin/run",
      "type": "module",
      "caption": "Media player example startup script",
      "readme": "Main example application file",
      "file": "bin/run.js"
    }
  }
};