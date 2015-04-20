Packages["fs"] = {
  "name": "fs",
  "npmname": "ose-fs",
  "caption": "Filesystem",
  "readme": "This package contains definitions of [entry kinds] that represent\nfiles and directories and gives OSE access to the filesystem and\nregisters fs as a source to the [Media player].\n\nSee [Media player example].\n\nIt also defines a JSON file-based database backend for shards.",
  "line": 10,
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
    "lib/db": {
      "name": "lib/db",
      "type": "class",
      "file": "lib/db.js",
      "description": "Makes it possible to use filesystems as a database backend for\n[shards].",
      "method": {
        "constructor": {
          "name": "constructor",
          "type": "method",
          "description": "Constructor of database backend used by shards",
          "params": [
            {
              "name": "config",
              "description": "Configuration",
              "type": "Object",
              "props": [
                {
                  "name": "root",
                  "description": "Path to root of database",
                  "type": "String"
                }
              ]
            }
          ]
        }
      }
    },
    "lib": {
      "name": "lib",
      "type": "singleton",
      "caption": "Filesystem core",
      "readme": "Core singleton of ose-fs npm package. Registers [entry kinds]\ndefined by this package to the `\"fs\"` [scope].",
      "file": "lib/index.js"
    },
    "lib/jsonDb": {
      "name": "lib/jsonDb",
      "type": "class",
      "file": "lib/jsonDb.js",
      "description": "Makes it possible to save entries to JSON files",
      "method": {
        "constructor": {
          "name": "constructor",
          "type": "method",
          "description": "Constructor of database backend used by shards",
          "params": [
            {
              "name": "config",
              "description": "Configuration",
              "type": "Object",
              "props": [
                {
                  "name": "root",
                  "description": "Path to root of database",
                  "type": "String"
                }
              ]
            }
          ]
        }
      }
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