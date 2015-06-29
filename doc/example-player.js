Packages["example-player"] = {
  "name": "example-player",
  "npmname": "ose-example-player",
  "caption": "Media player example",
  "readme": "This example is an Node.js media player application based on the\nOSE framework showcasing some of its principles and capabilities.",
  "line": 79,
  "features": "- Playback of predefined streams, local files, items in history\n- Near-realtime synchronization among all front- and backend\n  instances\n- Playback through [VLC]\n- Volume control using [PulseAudio]\n- Remote control of keyboard and pointer through xdotool ([xorg])\n- Integration with other example applications: ([DVB\n  streamer](#example-dvb), [LIRC](#example-lirc), [Raspberry\n  Pi](#example-rpi))",
  "scope": "media",
  "usage": "## Usage\n\nFor the Media player application to work, you need the following prerequisites:\n- Node.js > 0.10, npm, git\n- bower<br>\n  `sudo npm install -g bower`\n- PulseAudio configured with the D-Bus control interface<br>\n  `pactl load-module module-dbus-protocol`\n- VLC 2.2 or newer<br>\n  `sudo apt-get install vlc`\n\nTo install the example application, do the following:\n\n    git clone https://github.com/OpenSmartEnvironment/ose-example-player\n    cd ose-example-player\n    npm install\n\nTo configure this example, edit `./bin/run.js`. For example, below\nyou can set the path to your media directory:\n\n    // Access to local filesystem\n    exports.mediaFs = {\n      id: 'ose/lib/shard',\n      sid: 4,                    // Shard id unique within the space\n      scope: 'fs',               // Scope the shard belongs to\n      alias: 'mediaFs',          // Shard alias\n      db: {                      // Database containing shards data\n        id: 'ose-fs/lib/db',     // Database class\n        // Set directory containing media files:\n        root: Path.dirname(Path.dirname(module.filename)) + '/media',     \n      }\n    };\n\nTo start the Media player example application, execute the startup script from an X.Org session.\n\n    ./bin/run.js\n\nTo access the [HTML5 frontend], open the following URL in Firefox\n**37 or newer** (Iceweasel in Debian Jessie is too old).<br>\n**Before opening the link, enable the `dom.webcomponents.enabled` option in `about:config`.**\n\n    http://localhost:4431",
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