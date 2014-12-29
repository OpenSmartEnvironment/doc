Packages["boards"] = {
  "name": "boards",
  "npmname": "ose-boards",
  "caption": "Boards",
  "readme": "This package contains definitions of [kinds of entries] that\nrepresent OSE boards. These boards use the [pins] component and\nallow to control < 250 V AC and < 30 V DC appliances.\n\nBoards are intended to be used in a power distributor.\n\nOSE boards are in development, and their production date is not yet\nspecified.",
  "file": "lib/din/pin.js",
  "line": 10,
  "aliases": "oseBoard oseBoards oseMainBoard oseMainBoards osePwmBoard osePwmBoards",
  "modules": {
    "lib": {
      "name": "lib",
      "type": "singleton",
      "caption": "Boards core",
      "readme": "Core singleton of [ose-boards] npm package. Registers [entry kinds]\ndefined by this package to the `control` [scope].",
      "file": "lib/index.js"
    },
    "content": {
      "name": "content",
      "type": "singleton",
      "super": "ose/lib.http.content",
      "caption": "Boards content",
      "readme": "Provides files of [ose-boards] package to the browser.",
      "file": "content.js"
    }
  }
};