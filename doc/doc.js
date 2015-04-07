Packages["doc"] = {
  "name": "doc",
  "npmname": "ose-doc",
  "caption": "OSE Documentation",
  "readme": "This package is used to build documentation for all official OSE\npackages.",
  "file": "lib/entry/index.js",
  "line": 16,
  "modules": {
    "bin/doc": {
      "name": "bin/doc",
      "type": "module",
      "caption": "Documentation build script",
      "readme": "To build complete documentation, go to the \"ose-doc\" package directory and run:\n\n    node bin/doc.js",
      "file": "bin/doc.js"
    }
  }
};