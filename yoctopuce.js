Packages["yoctopuce"] = {
  "name": "yoctopuce",
  "npmname": "ose-yoctopuce",
  "caption": "Yoctopuce",
  "readme": "This package integrates some Yoctopuce sensor into\nthe OSE ecosystem.",
  "file": "content.js",
  "line": 12,
  "modules": {
    "lib/hub": {
      "name": "lib/hub",
      "type": "singleton",
      "super": "ose/lib.kind",
      "caption": "Yoctopuce VirtualHub kind",
      "readme": "[Entry kind] representing Yoctopuce VirtualHub.",
      "file": "lib/hub/index.js"
    },
    "lib": {
      "name": "lib",
      "type": "singleton",
      "caption": "Yoctopuce core",
      "readme": "Core singleton of [ose-yoctopuce] npm package. Registers [entry kinds]\ndefined by this package to the `\"control\"` [scope].",
      "file": "lib/index.js"
    },
    "content": {
      "name": "content",
      "type": "singleton",
      "super": "ose/lib.http.content",
      "caption": "Yoctopuce content",
      "readme": "Provides files of [ose-yoctopuce] package to the browser.",
      "file": "content.js"
    }
  }
};