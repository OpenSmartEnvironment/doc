Packages["fs"] = {
  "name": "fs",
  "npmname": "ose-fs",
  "caption": "Filesystem",
  "readme": "This package contains definitions of [entry kinds] that represent\nfiles and directories and gives OSE access to the filesystem and\nregisters fs as a source to the [Media player].\n\nSee [Media player example].\n\nIt also defines a JSON file-based database backend for shards.",
  "line": 10,
  "scope": "fs",
  "modules": {
    "lib/dir": {
      "name": "lib/dir",
      "type": "kind",
      "super": "ose/lib.kind",
      "caption": "Dir kind",
      "readme": "[Entry kind] describing directories.",
      "file": "lib/dir/index.js",
      "kind": "dir"
    },
    "lib/file": {
      "name": "lib/file",
      "type": "kind",
      "super": "ose/lib.kind",
      "caption": "File kind",
      "readme": "[Entry kind] describing files.",
      "file": "lib/file/index.js",
      "kind": "file"
    },
    "lib/db": {
      "name": "lib/db",
      "type": "class",
      "caption": "Filesystem database backend",
      "readme": "Makes it possible to use filesystems as a database backend for\n[shards].",
      "file": "lib/db.js",
      "method": {
        "config": {
          "name": "config",
          "type": "method",
          "description": "Configure db backend",
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
      "caption": "JSON files database backned",
      "readme": "Makes it possible to save entries to JSON files",
      "file": "lib/jsonDb.js"
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