Packages["pa"] = {
  "name": "pa",
  "npmname": "ose-pa",
  "caption": "PulseAudio",
  "readme": "This package implements volume control for the [Media player].\n\nSee [Media player example].",
  "file": "content.js",
  "line": 10,
  "modules": {
    "lib/dbus": {
      "name": "lib/dbus",
      "type": "singleton",
      "super": "ose/lib.kind",
      "caption": "PulseAudio control kind",
      "readme": "[Entry kind] for PulseAudio instances\n\nEach entry communicates with PulseAudio via its D-Bus\ninterface. This functionality is currently implemented in a Python\nchild process.",
      "file": "lib/dbus/index.js"
    },
    "lib": {
      "name": "lib",
      "type": "singleton",
      "caption": "PulseAudio core",
      "readme": "Core singleton of [ose-pa] npm package. Registers [entry kinds]\ndefined by this package to the `\"control\"` [scope].",
      "file": "lib/index.js",
      "method": {
        "volume": {
          "name": "volume",
          "type": "method",
          "description": "[Command handler] set volume to specified level.",
          "params": [
            {
              "name": "value",
              "description": "Number between 0..1 | \"down\" | \"up\"",
              "type": "Number | String"
            }
          ]
        }
      }
    },
    "content": {
      "name": "content",
      "type": "singleton",
      "super": "ose/lib.http.content",
      "caption": "PulseAudio content",
      "readme": "Provides files of [ose-pa] package to the browser.",
      "file": "content.js"
    }
  }
};