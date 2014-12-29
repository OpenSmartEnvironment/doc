Packages["dvb"] = {
  "name": "dvb",
  "npmname": "ose-dvb",
  "caption": "DVB",
  "readme": "This package contains the general definition of DVB-related logic.\nCurrently it contains only the channel [entry kind] and registers\nDVB as a source to the [Media player].\n\nDVB channels are configured in .js files.\n\nExample:\n\nTODO",
  "file": "content.js",
  "line": 12,
  "modules": {
    "lib/channel": {
      "name": "lib/channel",
      "type": "singleton",
      "super": "ose/lib.kind",
      "caption": "DVB channel kind",
      "readme": "[Entry kind] describing DVB channels.",
      "file": "lib/channel/index.js"
    },
    "lib": {
      "name": "lib",
      "type": "singleton",
      "caption": "DVB core",
      "readme": "Core singleton of [ose-dvb] npm package. Registers [entry kinds]\ndefined by this package to the `\"media\"` [scope].",
      "file": "lib/index.js"
    },
    "content": {
      "name": "content",
      "type": "singleton",
      "super": "ose/lib.http.content",
      "caption": "DVB content",
      "readme": "Provides files of [ose-dvb] package to the browser.",
      "file": "content.js"
    }
  }
};