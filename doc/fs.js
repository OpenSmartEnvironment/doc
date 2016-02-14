Packages["fs"] = {
  "name": "fs",
  "npmname": "ose-fs",
  "caption": "Filesystem",
  "readme": "This package contains definitions of [entry kinds] that represent\nfiles and directories and gives OSE access to the filesystem and\nregisters fs as a source to the [Media player].\n\nSee [Media player example].\n\nIt also defines a JSON file-based database backend for shards.",
  "line": 13,
  "modules": {
    "lib": {
      "name": "lib",
      "type": "singleton",
      "caption": "Filesystem core",
      "readme": "Core singleton of ose-fs npm package. Registers [entry kinds]\ndefined by this package to the `\"fs\"` [schema].",
      "file": "lib/index.js"
    },
    "lib/dir": {
      "name": "lib/dir",
      "type": "kind",
      "super": "ose/lib.kind",
      "caption": "Filesystem inode kind",
      "readme": "[Entry kind] describing filesystem inodes (files, directories, etc)",
      "file": "lib/inode.js",
      "schema": "fs",
      "kind": "inode"
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