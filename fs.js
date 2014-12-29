Packages["fs"] = {
  "name": "fs",
  "npmname": "ose-fs",
  "caption": "Filesystem",
  "readme": "This package contains definitions of [entry kinds] that represent\nfiles and directories and gives OSE access to the filesystem and\nregisters fs as a source to the [Media player].\n\nSee [Media player example].",
  "file": "content.js",
  "line": 12,
  "modules": {
    "lib/dir": {
      "name": "lib/dir",
      "type": "singleton",
      "super": "ose/lib.kind",
      "caption": "Dir kind",
      "readme": "[Entry kind] describing directories.",
      "file": "lib/dir/index.js"
    },
    "lib/file": {
      "name": "lib/file",
      "type": "singleton",
      "super": "ose/lib.kind",
      "caption": "File kind",
      "readme": "[Entry kind] describing files.",
      "file": "lib/file/index.js"
    },
    "lib": {
      "name": "lib",
      "type": "singleton",
      "caption": "Filesystem core",
      "readme": "Core singleton of ose-fs npm package. Registers [entry kinds]\ndefined by this package to the `\"fs\"` [scope].",
      "file": "lib/index.js"
    },
    "content": {
      "name": "content",
      "type": "singleton",
      "super": "ose/lib.http.content",
      "caption": "Filesystem content",
      "readme": "Provides files of [ose-fs] package to the browser.",
      "file": "content.js"
    }
  }
};