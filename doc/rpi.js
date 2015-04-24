Packages["rpi"] = {
  "name": "rpi",
  "npmname": "ose-rpi",
  "caption": "Raspberry Pi",
  "readme": "This package contains [entry kinds] for integrating hardware from\nthe Raspberry Pi Foundation into OSE.\n\nSee [Raspberry Pi example].",
  "line": 10,
  "aliases": "raspberry raspberryPi raspberryCamera",
  "scope": "control",
  "modules": {
    "lib/camera": {
      "name": "lib/camera",
      "type": "kind",
      "super": "ose/lib.kind",
      "caption": "Raspberry Pi camera kind",
      "readme": "[Entry kind] describing Raspberry Pi cameras. It uses the raspicam\nnpm package to take pictures.",
      "file": "lib/camera/index.js",
      "kind": "raspicam"
    },
    "lib/rpi": {
      "name": "lib/rpi",
      "type": "kind",
      "super": "ose/lib.kind",
      "caption": "Raspberry Pi kind",
      "readme": "[Entry kind] describing Raspberry Pi boards. It is possible to\ncontrol GPIO pins using the [Pins] component.",
      "file": "lib/rpi/index.js",
      "kind": "rpi"
    },
    "lib": {
      "name": "lib",
      "type": "singleton",
      "caption": "Raspberry core",
      "readme": "Core singleton of [ose-rpi] npm package. Registers [entry kinds]\ndefined by this package to the `\"control\"` [scope].",
      "file": "lib/index.js"
    },
    "content": {
      "name": "content",
      "type": "singleton",
      "super": "ose/lib.http.content",
      "caption": "Raspberry content",
      "readme": "Provides files of [ose-rpi] package to the browser.",
      "file": "content.js"
    }
  }
};