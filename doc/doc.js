Packages["doc"] = {
  "name": "doc",
  "npmname": "ose-doc",
  "caption": "OSE software documentation",
  "readme": "This package is used to build documentation for all official OSE\npackages.",
  "line": 17,
  "modules": {
    "bin/doc": {
      "name": "bin/doc",
      "type": "module",
      "caption": "Documentation build script",
      "readme": "To build complete documentation, go to the \"ose-doc\" package parent directory and run:\n\n    ose-doc/bin/doc.js",
      "file": "bin/doc.js"
    }
  }
};