Packages["example-player"] = {
  "name": "example-player",
  "npmname": "ose-example-player",
  "caption": "Media player example",
  "readme": "This example is an Node.js application based on the OSE framework\nshowcasing some of its principles and capabilities. It provides a\nmedia player with the following features:\n\n- Playback of predefined streams, local files, items in history\n- Near-realtime synchronization among all front- and backend\n  instances\n- Playback through VLC\n- Volume control using PulseAudio\n- Integration with other example applications: ([DVB\n  streamer](#example-dvb), [LIRC](#example-lirc), [Raspberry\n  Pi](#example-rpi))",
  "file": "data/streams.js",
  "line": 7,
  "description": "## Installation\n\nFor the Media player application to work, you need the following prerequisities:\n- Node.js and npm\n- PulseAudio configured with the D-Bus control interface\n- Python 3\n- VLC\n\nIf you run Debian Jessie, just run:\n\n    sudo apt-get install libdbus-1-dev pulseaudio python3 vlc\n\n\nTo enable the dbus control interface, do:\n\n    pactl load-module module-dbus-protocol\n\n\nTo install the example application, do one of the following:\n\n    npm install ose-example-player\n\nor\n   \n    git clone https://github.com/OpenSmartEnvironment/ose-example-player\n\n\nTo start the Media player example application, change to the installation\ndirectory and execute the startup script from an X.Org session. To\nrun the example from outside an X.Org session (in a console or\nthrough ssh), export the display variable in the shell:\n\n    export DISPLAY=\":0.0\"\n\n    cd ose-example-player\n    ./bin/run.js\n\nTo access the [HTML5 frontend], open the following URL in Firefox\n37 or newer with the `dom.webcomponents.enabled` option enabled in\n`about:config`:\n\n    http://localhost:4431",
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