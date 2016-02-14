Packages["example-player"] = {
  "name": "example-player",
  "npmname": "ose-example-player",
  "caption": "Media player example",
  "readme": "This example is an Node.js media player application based on the\nOSE framework showcasing some of its principles and capabilities.",
  "line": 61,
  "features": "- Playback through [VLC] of:\n  - predefined streams\n  - local files\n  - items in history\n  - Icecast directory\n- Volume control using [PulseAudio]\n- Remote control of keyboard and pointer through xdotool ([xorg])\n- Integration with other example applications:\n  - [DVB streamer](#example-dvb)\n  - [LIRC](#example-lirc)\n  - [Raspberry Pi](#example-rpi)",
  "usage": "## Usage\n\nFor the Media player application to work, you need the following prerequisites:\n- Node.js > 0.12, npm, git\n- PulseAudio configured with the D-Bus control interface<br>\n  `pactl load-module module-dbus-protocol`\n- VLC 2.2 or newer<br>\n  `sudo apt-get install vlc`\n\n\nTo install the example application, do the following:\n\n    sudo apt-get install libdbus-1-dev pkg-config\n    git clone https://github.com/OpenSmartEnvironment/ose-example-player\n    cd ose-example-player\n    npm install\n\n\nTo configure this example, edit `ose-example-player/bin/run.js`. Find and replace \"CHANGE_ME\" text with appropriate values.\n\nTo start the Media player example application, execute the startup script from an X.Org session.\n\n    ./ose-example-player/bin/run.js\n\n\nTo access the [HTML5 frontend], open the following URL in [supported browser]\n\n    http://localhost:4431",
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