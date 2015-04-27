Packages["youtube"] = {
  "name": "youtube",
  "npmname": "ose-youtube",
  "caption": "YouTube",
  "readme": "This package integrates searching and playing YouTube videos into\nthe [Media player].\n\nIt contains the definition of the YouTube stream [entry kind] and\nregisters it as a source to [Media player].\n\nSee [Media player example].",
  "line": 10,
  "scope": "youtube",
  "modules": {
    "lib/video": {
      "name": "lib/video",
      "type": "kind",
      "super": "ose/lib.kind",
      "caption": "YouTube video kind",
      "readme": "[Entry kind] representing YouTube videos.",
      "file": "lib/video/index.js",
      "kind": "video",
      "undefined": {
        "undefined": {
          "description": "Send media item to to playback",
          "params": [
            {
              "name": "player",
              "description": "Media player entry",
              "type": "Object"
            },
            {
              "name": "item",
              "description": "Media item entry",
              "type": "Object"
            }
          ]
        }
      }
    },
    "lib": {
      "name": "lib",
      "type": "singleton",
      "caption": "YouTube core",
      "readme": "Core singleton of [ose-youtube] npm package. Registers [entry kinds]\ndefined by this package to the `\"media\"` [scope].",
      "file": "lib/index.js"
    },
    "content": {
      "name": "content",
      "type": "singleton",
      "super": "ose/lib.http.content",
      "caption": "YouTube content",
      "readme": "Provides files of [ose-youtube] package to the browser.",
      "file": "content.js"
    }
  }
};