Packages["level"] = {
  "name": "level",
  "npmname": "ose-level",
  "caption": "LevelDB",
  "line": 11,
  "description": "This package allows OSE to use LevelDB as a data store.",
  "modules": {
    "lib": {
      "name": "lib",
      "type": "class",
      "caption": "LevelDB schema class",
      "readme": "This class can be used as a base class to create schemas using LevelDB as a data store.",
      "file": "lib/index.js",
      "description": "Entries within shards can be indexed using maps. Each map is a\nkey/value store using LevelDB. Each key is an index by which the\nmap is ordered. Maps are defined by functions in a similar way as\nin CouchDB.",
      "property": {
        "maps": {
          "name": "maps",
          "type": "property",
          "dtype": "Object",
          "description": "Object containing maps definitions"
        }
      }
    },
    "content": {
      "name": "content",
      "type": "singleton",
      "super": "ose/lib.http.content",
      "caption": "LevelDB content",
      "readme": "Provides files of [ose] package to the browser.",
      "file": "content.js"
    }
  }
};