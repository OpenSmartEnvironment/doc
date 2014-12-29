Packages["xorg"] = {
  "name": "xorg",
  "npmname": "ose-xorg",
  "caption": "X.Org",
  "readme": "This package allows to control the X.Org server with xdotool.\n\nSee [Media player example].",
  "file": "content.js",
  "line": 12,
  "modules": {
    "lib/xorg": {
      "name": "lib/xorg",
      "type": "singleton",
      "super": "ose/lib.kind",
      "caption": "X.Org server kind",
      "readme": "[Entry kind] for X.Org server\n\nIt uses xdotool to remotely control the desktop.",
      "file": "lib/xorg/index.js"
    },
    "lib": {
      "name": "lib",
      "type": "singleton",
      "caption": "X.Org core",
      "readme": "Core singleton of ose-xorg npm package. Registers [entry kinds]\ndefined by this package to the `\"control\"` [scope].",
      "file": "lib/index.js"
    },
    "content": {
      "name": "content",
      "type": "singleton",
      "super": "ose/lib.http.content",
      "caption": "X.Org content",
      "readme": "Provides files of [ose-xorg] package to the browser.",
      "file": "content.js"
    }
  }
};