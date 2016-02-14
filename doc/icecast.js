Packages["icecast"] = {
  "name": "icecast",
  "npmname": "ose-icecast",
  "caption": "Icecast",
  "readme": "This package makes it possible to search for Icecast streams in the\nIcecast directory (http://dir.xiph.org)\n\nIt defines the icecast stream [entry kind] and registers it as a\nsource to [Media player].\n\nSee [Media player example].",
  "line": 13,
  "modules": {
    "lib": {
      "name": "lib",
      "type": "singleton",
      "caption": "Icecast core",
      "readme": "Core singleton of [ose-icecast] npm package. Registers [entry kinds]\ndefined by this package to the `\"icecast\"` [schema].",
      "file": "lib/index.js"
    },
    "lib/stream": {
      "name": "lib/stream",
      "type": "kind",
      "super": "ose/lib.kind",
      "caption": "Icecast stream kind",
      "readme": "[Entry kind] describing Icecast streams.",
      "file": "lib/stream.js",
      "schema": "icecast",
      "kind": "stream"
    },
    "content": {
      "name": "content",
      "type": "singleton",
      "super": "ose/lib.http.content",
      "caption": "Icecast content",
      "readme": "Provides files of [ose-icecast] package to the browser.",
      "file": "content.js"
    }
  }
};